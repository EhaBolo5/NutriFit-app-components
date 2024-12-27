import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
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
const customerFormAlert = document.getElementById("alerrCustomerForm");
const listEmptyAlert = document.getElementById("alertMessageEmptyList");
const listTable = document.getElementById("responsinveTable");
const loadingSpinner = document.querySelector(".loading-container");
let selectedCustomerId = null;
const updateCustomerBTN = document.getElementById("updateCustomerBtn");
const removeCustomerBTN = document.getElementById("removeCustomerBtn");
const confirmCustomerBTN = document.getElementById("confirmRemoveBtn");
const addCustomerBTN = document.getElementById("addCustomerBtn");
const formOverlay = document.getElementById("formOverlay");
const formHeaderTxt = document.getElementById("formHeader-txt");
const customerForm = document.getElementById("customerForm");
const addCustomerBtn = document.getElementById("addCustomerBtn");
const alertCustomerForm = document.getElementById("alerrCustomerForm");
const customerFormSpinner = document.getElementById("customerFormSpinner");

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

      // Temporarily store documents in an array
      const customersArray = [];
      querySnapshot.forEach((doc) => {
        customersArray.push({ id: doc.id, data: doc.data() });
      });

      // Reverse the array
      customersArray.reverse();

      customersArray.forEach(({ id, data: customer }) => {
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
          selectedCustomerId = id; // Correctly set the selected document ID
          document.getElementById("idError").innerText = "";
          document.getElementById("phoneError").innerText = "";
          document.getElementById("emailError").innerText = "";
          updateCustomerBTN.style.display = "flex";
          removeCustomerBTN.style.display = "flex";
          addCustomerBTN.style.display = "none";
          formOverlay.style.display = "flex";
          document.getElementById("id").disabled = true;
          document.getElementById("phone").disabled = true;
          document.getElementById("email").disabled = true;
          formHeaderTxt.innerHTML = `${customer.name} ${customer.family}`;
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

const validateCustomer = async (id, email, phone) => {
  const customersRef = collection(db, "Customers");

  // Check for duplicate ID, Email, and Phone
  const idQuery = query(customersRef, where("id", "==", id));
  const emailQuery = query(customersRef, where("email", "==", email));
  const phoneQuery = query(customersRef, where("phone", "==", phone));

  const [idSnapshot, emailSnapshot, phoneSnapshot] = await Promise.all([
    getDocs(idQuery),
    getDocs(emailQuery),
    getDocs(phoneQuery),
  ]);

  return {
    idExists: !idSnapshot.empty,
    emailExists: !emailSnapshot.empty,
    phoneExists: !phoneSnapshot.empty,
  };
};

// Handle the form submit
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Reset errors and hide alert
  document.getElementById("idError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("nameError").innerText = "";
  document.getElementById("familyError").innerText = "";
  document.getElementById("addressError").innerText = "";
  document.getElementById("birthdayError").innerText = "";
  alertCustomerForm.classList.add("d-none");

  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const birthday = document.getElementById("birthday").value.trim();
  const address = document.getElementById("address").value.trim();

  // Validate form fields locally
  let hasError = false;

  if (!/^[0-9]{9}$/.test(id)) {
    document.getElementById("idError").innerText =
      "ID must be exactly 9 digits.";
    hasError = true;
  }
  if (!/^[A-Za-z]{2,15}$/.test(name)) {
    document.getElementById("nameError").innerText =
      "First Name must be 2-15 letters with no spaces.";
    hasError = true;
  }
  if (!/^[A-Za-z]{2,15}$/.test(family)) {
    document.getElementById("familyError").innerText =
      "Last Name must be 2-15 letters with no spaces.";
    hasError = true;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("emailError").innerText = "Email is invalid.";
    hasError = true;
  }
  if (!/^\+972-[0-9]{9}$/.test(phone)) {
    document.getElementById("phoneError").innerText =
      "Phone number must be in the format +972-xxxxxxxxx.";
    hasError = true;
  }
  if (address.length > 30) {
    document.getElementById("addressError").innerText =
      "Address must not exceed 30 characters.";
    hasError = true;
  }
  if (!birthday) {
    document.getElementById("birthdayError").innerText =
      "Birthday is required.";
    hasError = true;
  }

  if (hasError) return; // Stop if any validation error exists

  // Show spinner
  customerFormSpinner
    .querySelector(".spinner-border")
    .classList.remove("d-none");

  try {
    // Validate customer in Firestore
    const { idExists, emailExists, phoneExists } = await validateCustomer(
      id,
      email,
      phone
    );

    if (idExists) {
      document.getElementById("idError").innerText =
        "A customer with this ID already exists.";
      return;
    }
    if (emailExists) {
      document.getElementById("emailError").innerText =
        "A customer with this Email already exists.";
      return;
    }
    if (phoneExists) {
      document.getElementById("phoneError").innerText =
        "A customer with this Phone Number already exists.";
      return;
    }

    // Add new customer
    const newCustomer = { id, name, family, email, phone, birthday, address };
    const docRef = await addDoc(collection(db, "Customers"), newCustomer);
    console.log(`Customer added successfully with ID: ${docRef.id}`);
    renderCustomers();

    // Reset the form
    customerForm.reset();

    // Disable form fields
    disableFormFields();

    // Show success alert
    customerFormAlert.innerText = "The record was added successfully.";
    alertCustomerForm.classList.remove("d-none");

    // Hide form after 3 seconds
    setTimeout(() => {
      alertCustomerForm.classList.add("d-none");
      formOverlay.style.display = "none";
      disableFormFields(false); // Enable form fields for future use
    }, 3000);
  } catch (error) {
    console.error("Error adding customer:", error);
    alert("An error occurred while adding the customer. Please try again.");
  } finally {
    // Hide spinner
    customerFormSpinner
      .querySelector(".spinner-border")
      .classList.add("d-none");
  }
};

// Attach the form handler
document
  .getElementById("customerForm")
  .addEventListener("submit", handleFormSubmit);

// Function to disable all form fields
const disableFormFields = (disable = true) => {
  const formElements = customerForm.querySelectorAll("input, button");
  formElements.forEach((element) => {
    element.disabled = disable;
  });
};

const handleUpdateCustomer = async (event) => {
  event.preventDefault();

  // Reset error messages and hide success alert
  document.getElementById("idError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("nameError").innerText = "";
  document.getElementById("familyError").innerText = "";
  document.getElementById("addressError").innerText = "";
  document.getElementById("birthdayError").innerText = "";
  customerFormAlert.classList.add("d-none");
  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();

  const birthday = document.getElementById("birthday").value.trim();
  const address = document.getElementById("address").value.trim();

  // Local field validation
  let hasError = false;

  if (!/^[A-Za-z]{2,15}$/.test(name)) {
    document.getElementById("nameError").innerText =
      "First Name must be 2-15 letters with no spaces.";
    hasError = true;
  }
  if (!/^[A-Za-z]{2,15}$/.test(family)) {
    document.getElementById("familyError").innerText =
      "Last Name must be 2-15 letters with no spaces.";
    hasError = true;
  }
  if (address.length > 30) {
    document.getElementById("addressError").innerText =
      "Address must not exceed 30 characters.";
    hasError = true;
  }
  if (!birthday) {
    document.getElementById("birthdayError").innerText =
      "Birthday is required.";
    hasError = true;
  }

  if (hasError) return; // Stop if there are validation errors

  // Show spinner while processing
  customerFormSpinner
    .querySelector(".spinner-border")
    .classList.remove("d-none");
  try {
    const customerRef = doc(db, "Customers", selectedCustomerId);
    await updateDoc(customerRef, {
      name,
      family,
      birthday,
      address,
    });

    console.log(`Customer updated successfully with ID: ${selectedCustomerId}`);
    renderCustomers();

    // Reset the form and hide overlay after successful update
    customerForm.reset();
    selectedCustomerId = null;

    // Show success alert and add message
    customerFormAlert.classList.remove("d-none");
    customerFormAlert.innerText = "The record was updated successfully.";

    // Hide the success alert after 2 seconds
    setTimeout(() => {
      customerFormAlert.classList.add("d-none");

      // Close the form after 2 seconds
      formOverlay.style.display = "none";
    }, 2000);
  } catch (error) {
    console.error("Error updating customer:", error);
    alert("An error occurred while updating the customer. Please try again.");
  } finally {
    // Hide the spinner after the update operation
    customerFormSpinner
      .querySelector(".spinner-border")
      .classList.add("d-none");
  }
};

// Attach event listener to the "Update Customer" button
updateCustomerBTN.addEventListener("click", handleUpdateCustomer);

// Attach event listener to the submit button
addCustomerBtn.addEventListener("click", handleFormSubmit);

const removeCustomer = async () => {
  if (!selectedCustomerId) return;

  // Change card header to "Removing"
  const cardHeader = document.querySelector(
    "#importantNoticeAlert .card-header h3"
  );
  cardHeader.textContent = "Removing";

  // Replace text and buttons with the spinner
  document.querySelector(".card-body p").classList.add("d-none"); // Hide the text
  document
    .getElementById("importnantNoticeBTNsContainer")
    .classList.add("d-none"); // Hide the buttons
  document
    .getElementById("loadingSpinnerWrapperOnRemove")
    .classList.remove("d-none"); // Show the spinner

  // Show the alert box if it's not already visible
  document.getElementById("importantNoticeAlert").classList.remove("d-none");

  try {
    const customerRef = doc(db, "Customers", selectedCustomerId);
    await deleteDoc(customerRef);

    // After successful removal, change the header and show success message
    cardHeader.textContent = "Removed";
    document
      .getElementById("successMessageOnRemove")
      .classList.remove("d-none");

    // Hide the success message and alert box after 2 seconds
    setTimeout(() => {
      document.getElementById("successMessageOnRemove").classList.add("d-none");
      document.getElementById("importantNoticeAlert").classList.add("d-none");
      formOverlay.style.display = "none";
    }, 2000);

    // Render the updated list of customers
    await renderCustomers();

    // Reset the form and the selected customer ID
    selectedCustomerId = null;
  } catch (error) {
    console.error("Error removing customer:", error);
    // Optionally, you can handle errors by showing an error message in the alert box
  } finally {
    // Hide the spinner after the operation is complete
    document
      .getElementById("loadingSpinnerWrapperOnRemove")
      .classList.add("d-none");
  }
};

confirmCustomerBTN.addEventListener("click", removeCustomer);

renderCustomers();
