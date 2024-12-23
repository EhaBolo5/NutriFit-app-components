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

// Firebase Configuration
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
const customersList = document.getElementById("customersTableBody");
const alertMessage = document.getElementById("alertMessageEmptyList");
const addCustomerForm = document.getElementById("customerForm");
const loadingSpinner = document.getElementById("loadingSpinner");
const successMessage = document.getElementById("successMessage");
const overlay = document.getElementById("formOverlay");
const formElements = addCustomerForm.querySelectorAll("input, button");
const exportDropdown = document.getElementById("exportBtnsContainer");
let selectedCustomerId = null;
// const showFormBtn = document.getElementById("showFormBtn");
const removeBtn = document.getElementById("removeBtn");
const removeButton = document.getElementById("confirmBtn");
const inputSearch = document.getElementById("searchInput");

// Function to calculate age from birthday
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

// Function to Fetch and Render Customers
async function renderCustomers() {
  try {
    const querySnapshot = await getDocs(collection(db, "Customers"));
    customersList.innerHTML = ""; // Clear the table

    if (querySnapshot.empty) {
      alertMessage.classList.remove("d-none");
      exportDropdown.classList.add("d-none");
      inputSearch.disabled = true;
    } else {
      alertMessage.classList.add("d-none");
      exportDropdown.classList.remove("d-none");
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

        row.addEventListener("click", () => {
          selectedCustomerId = doc.id; // Correctly set the selected document ID
          updateCus.style.display = "flex";
          overlay.style.display = "flex";
          removeBtn.classList.remove("d-none");
          formHeaderTxt.innerHTML = `${customer.name} ${customer.family}`;
          removeBtn.style.display = "block";
          addCus.style.display = "none";
          formElements.forEach((element) => (element.disabled = false));
          document.getElementById("id").disabled = true;
          inputSearch.disabled = false;
          // Populate form fields
          document.querySelector("#id").value = customer.id;
          document.querySelector("#name").value = customer.name;
          document.querySelector("#family").value = customer.family;
          document.querySelector("#email").value = customer.email;
          document.querySelector("#phone").value = customer.phone;
          document.querySelector("#address").value = customer.address;
          document.querySelector("#birthday").value = customer.birthday;
          overlay.style.display = "flex";
        });

        customersList.appendChild(row);
      });
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
}

const successMessageOnRemove = document.getElementById(
  "successMessageOnRemove"
);
const loadingSpinnerOnRemove = document.getElementById("loadingSpinneOnRemove");
const cardBody = document.querySelector(".card-body");
const importantNoticeHeader = document.querySelector(".card-header h3");

removeButton.addEventListener("click", async () => {
  if (!selectedCustomerId) {
    console.error("No customer selected for removal.");
    return;
  }

  try {
    const customerDocRef = doc(db, "Customers", selectedCustomerId);

    console.log("Attempting to remove customer with ID:", selectedCustomerId);

    // Hide card body elements
    cardBody.style.display = "none";

    // Change header text
    importantNoticeHeader.textContent = "Removing the record";

    // Display spinner
    loadingSpinnerOnRemove.classList.remove("d-none");

    // Perform the Firebase removal
    await deleteDoc(customerDocRef);

    console.log(`Customer with ID ${selectedCustomerId} removed successfully.`);

    // Hide spinner
    loadingSpinnerOnRemove.classList.add("d-none");

    // Change header text
    importantNoticeHeader.textContent = "The record was removed";

    // Show success message
    successMessageOnRemove.classList.remove("d-none");

    // Refresh the UI
    await renderCustomers();

    // Reset other UI elements after a delay
    setTimeout(() => {
      cardBody.style.display = "block";
      importantNoticeHeader.textContent = "Important Notice";

      // Hide success message
      successMessageOnRemove.classList.add("d-none");

      // Reset variables and UI
      overlay.style.display = "none";
      removeBtn.style.display = "none";
      customerForm.reset();
      selectedCustomerId = null;
      closeFomrBtn.style.display = "block";
      removeAlert.style.display = "none";
      formElements.forEach((element) => (element.disabled = false));
    }, 3000);
  } catch (error) {
    console.error("Error removing customer:", error);

    // Ensure spinner and success message are hidden in case of error
    loadingSpinnerOnRemove.classList.add("d-none");
    successMessageOnRemove.classList.add("d-none");

    // Reset card body and header
    cardBody.style.display = "block";
    importantNoticeHeader.textContent = "Important Notice";
  }
});
document
  .getElementById("addCustomerBtn")
  .addEventListener("click", async () => {
    // Collect form data
    const name = document.getElementById("name").value.trim();
    const id = parseInt(document.getElementById("id").value.trim(), 10);
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const birthday = document.getElementById("birthday").value.trim();
    const family = document.getElementById("family").value.trim();

    // Validate input fields
    if (!name || !id || !email || !address || !phone || !birthday || !family) {
      alert("Please fill out all fields.");
      return;
    }

    // Prepare customer data
    const newCustomer = { name, id, email, address, phone, birthday, family };

    // Show loading spinner and disable form
    loadingSpinner.classList.remove("d-none");
    formElements.forEach((element) => (element.disabled = true));

    try {
      // Add the new customer to Firestore
      const docRef = await addDoc(collection(db, "Customers"), newCustomer);
      console.log("User added with ID: ", docRef.id);

      // Refresh the customer list
      await renderCustomers();

      // Show success message and reset form
      successMessage.innerHTML = "The customer was added successfully!";
      successMessage.classList.remove("d-none");
      setTimeout(() => {
        successMessage.classList.add("d-none"); // Hide success message
        overlay.style.display = "none"; // Hide form overlay
        inputSearch.disabled = false;
        formElements.forEach((element) => {
          if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
            element.value = ""; // Clear input fields
          } else if (element.tagName === "SELECT") {
            element.selectedIndex = 0; // Reset select fields
          }
        });
      }, 3000);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("Failed to add customer. Please try again.");
    } finally {
      // Hide loading spinner and enable form
      loadingSpinner.classList.add("d-none");
      formElements.forEach((element) => (element.disabled = false));
    }
  });

// Update record on button click
const updateCusButton = document.getElementById("updateCustomerBtn");
updateCusButton.addEventListener("click", async () => {
  if (!selectedCustomerId) {
    console.error("No customer selected for update.");
    return;
  }

  // Get updated values from the form
  const updatedName = document.querySelector("#name").value.trim();
  const updatedFamily = document.querySelector("#family").value.trim();
  const updatedEmail = document.querySelector("#email").value.trim();
  const updatedPhone = document.querySelector("#phone").value.trim();
  const updatedAddress = document.querySelector("#address").value.trim();
  const updatedBirthday = document.querySelector("#birthday").value.trim();

  // Validate input
  if (
    !updatedName.match(/^[A-Za-z]+$/) ||
    !updatedFamily.match(/^[A-Za-z]+$/) ||
    !updatedEmail.includes("@") ||
    !updatedPhone.match(/^\+972-[0-9]{9}$/)
  ) {
    errorBox.classList.remove("d-none");
    return;
  }

  // Show loading spinner and keep form inputs disabled
  loadingSpinner.classList.remove("d-none");
  formElements.forEach((element) => (element.disabled = true));

  try {
    // Prepare updated data
    const updatedCusData = {
      name: updatedName,
      family: updatedFamily,
      email: updatedEmail,
      phone: updatedPhone,
      address: updatedAddress,
      birthday: updatedBirthday,
    };

    // Update the customer in Firestore
    const customerRef = doc(db, "Customers", selectedCustomerId);
    await updateDoc(customerRef, updatedCusData);

    // Simulate a server response delay (3 seconds for UI feedback)
    setTimeout(() => {
      // Re-render the customer list
      renderCustomers();

      // Hide loading spinner
      loadingSpinner.classList.add("d-none");

      // Show success message
      successMessage.innerHTML = "The record was updated successfully!";
      successMessage.classList.remove("d-none");

      // Reset UI state after success
      setTimeout(() => {
        successMessage.classList.add("d-none"); // Hide success message
        overlay.style.display = "none"; // Close the form
        customerForm.reset(); // Reset the form
        selectedCustomerId = null; // Clear the selected customer ID
      }, 2000); // Show success message for 2 seconds
    }, 3000); // Simulate a 3-second delay
  } catch (error) {
    console.error("Error updating customer:", error);

    // Handle error (hide spinner, show error message)
    loadingSpinner.classList.add("d-none");
    errorBox.classList.remove("d-none");
    setTimeout(() => {
      errorBox.classList.add("d-none"); // Hide error message after a delay
    }, 2000);
  } finally {
    // Ensure form fields are only re-enabled when the overlay is hidden
    overlay.addEventListener("transitionend", () => {
      if (overlay.style.display === "none") {
        formElements.forEach((element) => (element.disabled = false));
      }
    });
  }
});

renderCustomers();
