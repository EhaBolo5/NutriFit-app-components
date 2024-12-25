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

// Form and Button References
// const customerForm = document.getElementById("customerForm");
// const addCustomerBtn = document.getElementById("addCustomerBtn");

// // Function to check for duplicate ID, Email, or Phone in Firestore
// const validateCustomer = async (id, email, phone) => {
//   const customersRef = collection(db, "Customers");

//   // Check for duplicate ID
//   const idQuery = query(customersRef, where("id", "==", id));
//   const emailQuery = query(customersRef, where("email", "==", email));
//   const phoneQuery = query(customersRef, where("phone", "==", phone));

//   const [idSnapshot, emailSnapshot, phoneSnapshot] = await Promise.all([
//     getDocs(idQuery),
//     getDocs(emailQuery),
//     getDocs(phoneQuery),
//   ]);

//   return {
//     idExists: !idSnapshot.empty,
//     emailExists: !emailSnapshot.empty,
//     phoneExists: !phoneSnapshot.empty,
//   };
// };

// // Function to handle form submission
// const handleFormSubmit = async (event) => {
//   event.preventDefault();
//   document.getElementById("idError").innerText = "";
//   document.getElementById("emailError").innerText = "";
//   document.getElementById("phoneError").innerText = "";
//   const id = document.getElementById("id").value.trim();
//   const name = document.getElementById("name").value.trim();
//   const family = document.getElementById("family").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();
//   const birthday = document.getElementById("birthday").value.trim();
//   const address = document.getElementById("address").value.trim();

//   // Validate customer in Firestore
//   try {
//     const { idExists, emailExists, phoneExists } = await validateCustomer(
//       id,
//       email,
//       phone
//     );

//     if (idExists) {
//       document.getElementById("idError").innerText =
//         "A customer with this ID already exists.";
//       return;
//     }
//     if (emailExists) {
//       document.getElementById("emailError").innerText =
//         "A customer with this Email already exists.";
//       return;
//     }
//     if (phoneExists) {
//       document.getElementById("phoneError").innerText =
//         "A customer with this Phone Number already exists.";
//       return;
//     }

//     // Add new customer
//     const newCustomer = { id, name, family, email, phone, birthday, address };
//     const docRef = await addDoc(collection(db, "Customers"), newCustomer);
//     console.log(`Customer added successfully with ID: ${docRef.id}`);
//     renderCustomers();
//     // Reset the form
//     customerForm.reset();
//   } catch (error) {
//     console.error("Error adding customer:", error);
//     alert("An error occurred while adding the customer. Please try again.");
//   }
// };

// // Attach event listener to the submit button
// addCustomerBtn.addEventListener("click", handleFormSubmit);

const customerForm = document.getElementById("customerForm");
const addCustomerBtn = document.getElementById("addCustomerBtn");
const alertCustomerForm = document.getElementById("alerrCustomerForm");
const customerFormSpinner = document.getElementById("customerFormSpinner");
// const formOverlay = document.getElementById("formOverlay");

// Function to check for duplicate ID, Email, or Phone in Firestore
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
    alertCustomerForm.classList.remove("d-none");

    // Hide form after 3 seconds
    setTimeout(() => {
      alertCustomerForm.classList.add("d-none");
      // formOverlay.classList.add("d-none");
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

renderCustomers();
