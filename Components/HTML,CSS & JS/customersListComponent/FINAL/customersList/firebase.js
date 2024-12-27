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
// on Add Customer
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

// Function to disable all form fields
const disableFormFields = (disable = true) => {
  const formElements = customerForm.querySelectorAll("input, button");
  formElements.forEach((element) => {
    element.disabled = disable;
  });
};

// Function to handle form submission
const handleFormSubmit = async (event) => {
  event.preventDefault();

  // Reset errors and hide alert
  document.getElementById("idError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  alertCustomerForm.classList.add("d-none");

  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const birthday = document.getElementById("birthday").value.trim();
  const address = document.getElementById("address").value.trim();

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

// Attach event listener to the submit button
addCustomerBtn.addEventListener("click", handleFormSubmit);

const handleUpdateCustomer = async (event) => {
  event.preventDefault();

  // Reset error messages and hide success alert
  document.getElementById("idError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  customerFormAlert.classList.add("d-none"); // Hide the success alert initially

  const id = document.getElementById("id").value.trim();
  const name = document.getElementById("name").value.trim();
  const family = document.getElementById("family").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const birthday = document.getElementById("birthday").value.trim();
  const address = document.getElementById("address").value.trim();

  // Show spinner while processing
  customerFormSpinner
    .querySelector(".spinner-border")
    .classList.remove("d-none");
  try {
    // Validate customer in Firestore to avoid duplicate IDs, emails, or phones

    // Update the customer data in Firestore
    const customerRef = doc(db, "Customers", selectedCustomerId); // Use selectedCustomerId for updating
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
    customerFormAlert.innerText = "The record was updated successfully."; // Set the success message

    // Hide the success alert after 2 seconds
    setTimeout(() => {
      customerFormAlert.classList.add("d-none");

      // Close the form after 2 seconds
      formOverlay.style.display = "none"; // Close the form (you may need to customize this for your form)
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

// const removeCustomer = async () => {
//   if (!selectedCustomerId) return;

//   // Show loading spinner while removing
//   document
//     .getElementById("loadingSpinnerWrapperOnRemove")
//     .classList.remove("d-none");
//   document.getElementById("importantNoticeAlert").classList.remove("d-none");

//   try {
//     const customerRef = doc(db, "Customers", selectedCustomerId);
//     await deleteDoc(customerRef);

//     // After successful removal, show success message
//     document
//       .getElementById("successMessageOnRemove")
//       .classList.remove("d-none");

//     // Hide the success message after 2 seconds
//     setTimeout(() => {
//       document.getElementById("successMessageOnRemove").classList.add("d-none");
//       // Hide the alert box after the success message is hidden
//       document.getElementById("importantNoticeAlert").classList.add("d-none");
//     }, 3000);

//     // Render the updated list of customers
//     await renderCustomers();

//     // Reset the form and the selected customer ID
//     formOverlay.style.display = "none";
//     selectedCustomerId = null;
//   } catch (error) {
//     console.error("Error removing customer:", error);
//     // Optionally, you can handle errors by showing an error message in the alert box
//   } finally {
//     // Hide the spinner after the operation is complete
//     document
//       .getElementById("loadingSpinnerWrapperOnRemove")
//       .classList.add("d-none");
//   }
// };

// confirmCustomerBTN.addEventListener("click", removeCustomer);

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
