// Firebase Configuration
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.17.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDF5qp94rNJWo89_TspRX219H0StaYeLmk",
  authDomain: "nutrifit-planner-app.firebaseapp.com",
  projectId: "nutrifit-planner-app",
  storageBucket: "nutrifit-planner-app.firebasestorage.app",
  messagingSenderId: "289660430634",
  appId: "1:289660430634:web:778db65418ae7f2f39d653",
  measurementId: "G-B0DVX6PNH5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// DOM Elements
const elements = {
  customersList: document.getElementById("customersTableBody"),
  alertMessage: document.getElementById("alertMessageEmptyList"),
  addCustomerForm: document.getElementById("customerForm"),
  loadingSpinner: document.getElementById("loadingSpinner"),
  successMessage: document.getElementById("successMessage"),
  overlay: document.getElementById("formOverlay"),
  exportDropdown: document.getElementById("exportBtnsContainer"),
  removeButton: document.getElementById("confirmBtn"),
  inputSearch: document.getElementById("searchInput"),
};

let selectedCustomerId = null;

// Utility Functions
const showElement = (element) => element.classList.remove("d-none");
const hideElement = (element) => element.classList.add("d-none");
const resetForm = (form) => {
  form.reset();
  Array.from(form.querySelectorAll("input, select, textarea")).forEach(
    (field) => {
      if (field.tagName === "INPUT" || field.tagName === "TEXTAREA") {
        field.value = "";
      } else if (field.tagName === "SELECT") {
        field.selectedIndex = 0;
      }
    }
  );
};
const calculateAge = (birthday) => {
  const birthDate = new Date(birthday);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDiff = currentDate.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
};

// Render Customers
const renderCustomers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "Customers"));
    elements.customersList.innerHTML = "";

    if (querySnapshot.empty) {
      showElement(elements.alertMessage);
      hideElement(elements.exportDropdown);
      elements.inputSearch.disabled = true;
    } else {
      hideElement(elements.alertMessage);
      showElement(elements.exportDropdown);
      elements.inputSearch.disabled = false;

      querySnapshot.forEach((doc) => {
        const customer = doc.data();
        const age = calculateAge(customer.birthday);

        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${customer.id}</td>
          <td>${customer.name}</td>
          <td>${customer.family}</td>
          <td>${customer.email}</td>
          <td>${customer.phone}</td>
          <td>${customer.birthday}</td>
          <td>${age}</td>
          <td>${customer.address}</td>
        `;

        row.addEventListener("click", () => openCustomerForm(doc.id, customer));
        elements.customersList.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

// Open Customer Form
const openCustomerForm = (id, customer) => {
  selectedCustomerId = id;
  elements.overlay.style.display = "flex";
  elements.addCustomerForm["id"].value = customer.id;
  elements.addCustomerForm["name"].value = customer.name;
  elements.addCustomerForm["family"].value = customer.family;
  elements.addCustomerForm["email"].value = customer.email;
  elements.addCustomerForm["phone"].value = customer.phone;
  elements.addCustomerForm["address"].value = customer.address;
  elements.addCustomerForm["birthday"].value = customer.birthday;
};

// Add Customer
const addCustomer = async () => {
  const newCustomer = Object.fromEntries(
    new FormData(elements.addCustomerForm).entries()
  );
  try {
    showElement(elements.loadingSpinner);
    await addDoc(collection(db, "Customers"), newCustomer);
    await renderCustomers();
    showElement(elements.successMessage);
    setTimeout(() => {
      hideElement(elements.successMessage);
      elements.overlay.style.display = "none";
      resetForm(elements.addCustomerForm);
    }, 3000);
  } catch (error) {
    console.error("Error adding customer:", error);
  } finally {
    hideElement(elements.loadingSpinner);
  }
};

elements.addCustomerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (selectedCustomerId) {
    await updateCustomer();
  } else {
    await addCustomer();
  }
});

// Update Customer
const updateCustomer = async () => {
  const updatedCustomer = Object.fromEntries(
    new FormData(elements.addCustomerForm).entries()
  );
  try {
    showElement(elements.loadingSpinner);
    const customerRef = doc(db, "Customers", selectedCustomerId);
    await updateDoc(customerRef, updatedCustomer);
    await renderCustomers();
    showElement(elements.successMessage);
    setTimeout(() => {
      hideElement(elements.successMessage);
      elements.overlay.style.display = "none";
      resetForm(elements.addCustomerForm);
      selectedCustomerId = null;
    }, 3000);
  } catch (error) {
    console.error("Error updating customer:", error);
  } finally {
    hideElement(elements.loadingSpinner);
  }
};

// Remove Customer
const removeCustomer = async () => {
  if (!selectedCustomerId) return;
  try {
    const customerRef = doc(db, "Customers", selectedCustomerId);
    await deleteDoc(customerRef);
    await renderCustomers();
    elements.overlay.style.display = "none";
    selectedCustomerId = null;
  } catch (error) {
    console.error("Error removing customer:", error);
  }
};

elements.removeButton.addEventListener("click", removeCustomer);
renderCustomers();
