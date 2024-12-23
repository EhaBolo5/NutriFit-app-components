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
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const customersList = document.getElementById("customersTableBody");
const listEmptyAlert = document.getElementById("alertMessageEmptyList");
const listTable = document.getElementById("responsinveTable");
const loadingSpinner = document.querySelector(".loading-container");
let selectedCustomerId = null;
const updateCustomerBTN = document.getElementById("updateCustomerBtn");
const removeCustomerBTN = document.getElementById("removeCustomerBtn");
const addCustomerForm = document.getElementById("customerForm");
const addCustomerBTN = document.getElementById("addCustomerBtn");
const formOverlay = document.getElementById("formOverlay");
const formHeaderTxt = document.getElementById("formHeader-txt");
const formElements = addCustomerForm.querySelectorAll("input, button");

function calculateAge(birthday) {
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
}

async function renderCustomers() {
  try {
    loadingSpinner.classList.remove("d-none");
    const querySnapshot = await getDocs(collection(db, "Customers"));
    customersList.innerHTML = "";

    if (querySnapshot.empty) {
      listEmptyAlert.classList.remove("d-none");
      listTable.classList.add("d-none");
      document.getElementById("searchInput").disabled = true;
    } else {
      listEmptyAlert.classList.add("d-none");
      listTable.classList.remove("d-none");
      document.getElementById("searchInput").disabled = false;
      querySnapshot.forEach((doc) => {
        const customer = doc.data();
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.family}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${customer.birthday}</td>
            <td>${calculateAge(customer.birthday)}</td>
            <td>${customer.address}</td>
          `;
        row.addEventListener("click", () => {
          selectedCustomerId = doc.id; // Correctly set the selected document ID
          updateCustomerBTN.style.display = "flex";
          removeCustomerBTN.style.display = "flex";
          addCustomerBTN.style.display = "none";
          formOverlay.style.display = "flex";
          document.getElementById("id").disabled = true;
          formHeaderTxt.innerHTML = `${customer.name} ${customer.family}`;
          // inputSearch.disabled = false;
          document.querySelector("#id").value = customer.id;
          document.querySelector("#name").value = customer.name;
          document.querySelector("#family").value = customer.family;
          document.querySelector("#email").value = customer.email;
          document.querySelector("#phone").value = customer.phone;
          document.querySelector("#address").value = customer.address;
          document.querySelector("#birthday").value = customer.birthday;
        });

        customersList.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
  } finally {
    loadingSpinner.classList.add("d-none");
  }
}

renderCustomers();
