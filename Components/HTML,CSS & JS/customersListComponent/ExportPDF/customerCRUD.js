let customers = [
  {
    id: 209765344,
    name: "John",
    family: "Doe",
    email: "john.doe1@example.com",
    phone: "+972-501234567",
    birthday: "15/06/1990",
    address: "123 Main St, Cityville",
  },
  {
    id: 198234567,
    name: "Jane",
    family: "Smith",
    email: "jane.smith2@example.com",
    phone: "+972-502345678",
    birthday: "08/09/1995",
    address: "456 Elm St, Townsville",
  },
  {
    id: 307654321,
    name: "Bob",
    family: "Brown",
    email: "bob.brown3@example.com",
    phone: "+972-503456789",
    birthday: "22/11/1990",
    address: "789 Oak St, Villagetown",
  },
  {
    id: 405123987,
    name: "Alice",
    family: "Johnson",
    email: "alice.johnson4@example.com",
    phone: "+972-504567890",
    birthday: "14/05/1993",
    address: "321 Maple Ave, Suburbia",
  },
  {
    id: 509876543,
    name: "Michael",
    family: "Williams",
    email: "michael.williams5@example.com",
    phone: "+972-505678901",
    birthday: "10/07/1985",
    address: "654 Pine Rd, Uptown",
  },
  {
    id: 608432198,
    name: "Sarah",
    family: "Taylor",
    email: "sarah.taylor6@example.com",
    phone: "+972-506789012",
    birthday: "02/03/1992",
    address: "987 Cedar Ln, Metrocity",
  },
  {
    id: 709123654,
    name: "Chris",
    family: "Evans",
    email: "chris.evans7@example.com",
    phone: "+972-507890123",
    birthday: "18/01/1988",
    address: "159 Birch Blvd, Downtown",
  },
  {
    id: 803567890,
    name: "Emma",
    family: "Wilson",
    email: "emma.wilson8@example.com",
    phone: "+972-508901234",
    birthday: "30/10/1994",
    address: "753 Spruce Dr, Hillview",
  },
  {
    id: 912345678,
    name: "David",
    family: "Clark",
    email: "david.clark9@example.com",
    phone: "+972-509012345",
    birthday: "27/08/1987",
    address: "852 Poplar Ct, Lakeside",
  },
  {
    id: 105432198,
    name: "Olivia",
    family: "Martinez",
    email: "olivia.martinez10@example.com",
    phone: "+972-501122334",
    birthday: "12/12/1999",
    address: "951 Aspen Ave, Riverwood",
  },
  {
    id: 203219876,
    name: "James",
    family: "Garcia",
    email: "james.garcia11@example.com",
    phone: "+972-502233445",
    birthday: "20/04/1986",
    address: "753 Walnut St, Greenwood",
  },
  {
    id: 309876123,
    name: "Sophia",
    family: "Anderson",
    email: "sophia.anderson12@example.com",
    phone: "+972-503344556",
    birthday: "11/11/1992",
    address: "147 Willow Ln, Meadowbrook",
  },
  {
    id: 406543219,
    name: "Liam",
    family: "Thomas",
    email: "liam.thomas13@example.com",
    phone: "+972-504455667",
    birthday: "05/02/1991",
    address: "369 Cypress Blvd, Crestview",
  },
  {
    id: 508321497,
    name: "Ava",
    family: "Lee",
    email: "ava.lee14@example.com",
    phone: "+972-505566778",
    birthday: "09/06/1990",
    address: "753 Laurel St, Forest Hills",
  },
  {
    id: 609874321,
    name: "Noah",
    family: "Walker",
    email: "noah.walker15@example.com",
    phone: "+972-506677889",
    birthday: "01/08/1989",
    address: "963 Chestnut Ave, Bayview",
  },
  {
    id: 703215486,
    name: "Isabella",
    family: "Hall",
    email: "isabella.hall16@example.com",
    phone: "+972-507788990",
    birthday: "22/03/1998",
    address: "852 Magnolia Dr, Woodside",
  },
  {
    id: 809123678,
    name: "Ethan",
    family: "Allen",
    email: "ethan.allen17@example.com",
    phone: "+972-508899001",
    birthday: "17/09/1988",
    address: "159 Beech St, Sunnyside",
  },
  {
    id: 912387654,
    name: "Mia",
    family: "Young",
    email: "mia.young18@example.com",
    phone: "+972-509900112",
    birthday: "13/07/1993",
    address: "147 Aspen Ct, Hillside",
  },
  {
    id: 109234765,
    name: "Alexander",
    family: "Harris",
    email: "alexander.harris19@example.com",
    phone: "+972-501223344",
    birthday: "10/01/1984",
    address: "321 Elm Dr, Seaview",
  },
  {
    id: 201098765,
    name: "Charlotte",
    family: "King",
    email: "charlotte.king20@example.com",
    phone: "+972-502334455",
    birthday: "18/04/1997",
    address: "951 Oak Ave, Riverside",
  },
];

let selectedCustomerId = null;
const showFormBtn = document.getElementById("showFormBtn");
const overlay = document.getElementById("overlay");
// const cancelBtn = document.getElementById("cancelBtn");
const errorBox = document.getElementById("errorBox");
const customerForm = document.getElementById("customerForm");
const loadingSpinner = document.getElementById("loadingSpinner");
const successMessage = document.getElementById("successMessage");
const closeFomrBtn = document.getElementById("closeFormBtn");
const removeBtn = document.getElementById("removeBtn");
const cancelRemoveBtn = document.getElementById("cancelBtn");
const removeAlert = document.getElementById("importantNoticeAlert");
const addCus = document.getElementById("addCustomerBtn");
const updateCus = document.getElementById("updateCustomerBtn");
const formHeaderTxt = document.getElementById("formHeaderTxt");
const id = document.getElementById("id");
const formElements = document.querySelectorAll(
  "#customerForm input, #customerForm button, #customerForm select, #customerForm textarea"
);

// Show overlay form
showFormBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  addCus.style.display = "flex";
  updateCus.style.display = "none";
  removeBtn.style.display = "none";
  errorBox.classList.add("d-none");
  formHeaderTxt.innerHTML = "New Customer";
  successMessage.classList.add("d-none");
  //   removeBtn.classList.add("d-none");
  loadingSpinner.classList.add("d-none");
  formElements.forEach((element) => (element.disabled = false));
});

// Form validation logic (simplified)
customerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  let isValid = true;

  // Example validation for a few fields
  const id = document.getElementById("id").value.trim();
  const firstName = document.getElementById("firstName").value.trim();
  const family = document.getElementById("family").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const birthdayInput = document.getElementById("birthday").value.trim();
  const address = document.getElementById("address").value.trim();

  // Validate and format birthday
  const [year, month, day] = birthdayInput.split("-"); // Assuming input is yyyy-mm-dd
  const birthday = `${day}/${month}/${year}`; // Convert to dd/mm/yyyy

  // Reset previous errors
  document.getElementById("idError").innerText = "";
  document.getElementById("firstNameError").innerText = "";
  document.getElementById("familyError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";
  document.getElementById("birthdayError").innerText = "";
  document.getElementById("addressError").innerText = "";

  if (!firstName.match(/^[A-Za-z]+$/)) {
    document.getElementById("firstNameError").innerText = "Invalid first name.";
    isValid = false;
  }
  if (!id.match(/^[0-9]{9}$/)) {
    document.getElementById("idError").innerText = "Invalid first ID.";
    isValid = false;
  }
  if (!family.match(/^[A-Za-z]+$/)) {
    document.getElementById("familyError").innerText = "Invalid family name.";
    isValid = false;
  }
  if (!email.includes("@")) {
    document.getElementById("emailError").innerText = "Invalid email.";
    isValid = false;
  }
  if (!phone.match(/^\+972-[0-9]{9}$/)) {
    document.getElementById("phoneError").innerText = "Invalid phone number.";
    isValid = false;
  }

  if (isValid) {
    // Show spinner for 5 seconds before adding customer
    loadingSpinner.classList.remove("d-none");
    formElements.forEach((element) => (element.disabled = true));
    setTimeout(() => {
      // Add the new customer to the list in b.js
      if (typeof addCustomer === "function") {
        addCustomer(id, firstName, family, email, birthday, phone, address); // Add customer to b.js list
      }
      successMessage.innerHTML = "The customer was added successfully!";
      successMessage.classList.remove("d-none");
      // Hide spinner and show success message
      loadingSpinner.classList.add("d-none");

      customerForm.reset(); // Reset the form fields

      // Hide the success message after 3 seconds and close form
      setTimeout(() => {
        successMessage.classList.add("d-none");
        overlay.style.display = "none";
      }, 2000);
    }, 3000); // Simulate a 5-second server response
  } else {
    errorBox.classList.remove("d-none");
  }
});

// Get table body element
const tableBody = document.getElementById("customersTableBody");

function renderCustomerTable() {
  tableBody.innerHTML = ""; // Clear the existing table content

  // Sort customers by id in descending order
  // const sortedCustomers = customers.sort((a, b) => b.id - a.id);
  const sortedCustomers = [...customers].reverse();

  sortedCustomers.forEach((customer) => {
    const row = document.createElement("tr");
    const currentYear = new Date().getFullYear();
    const birthYear = parseInt(customer.birthday.split("/")[2], 10);
    const age = currentYear - birthYear;
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

    // Attach click event to the row
    row.addEventListener("click", () => {
      overlay.style.display = "flex";
      errorBox.classList.add("d-none");
      successMessage.classList.add("d-none");
      loadingSpinner.classList.add("d-none");
      removeBtn.style.display = "block";
      formElements.forEach((element) => (element.disabled = false));
      formHeaderTxt.innerHTML = `${customer.name} ${customer.family}`;

      // Populate form fields
      document.querySelector("#id").value = customer.id;
      document.querySelector("#firstName").value = customer.name;
      document.querySelector("#family").value = customer.family;
      document.querySelector("#email").value = customer.email;
      document.querySelector("#phone").value = customer.phone;
      document.querySelector("#address").value = customer.address;
      document.querySelector("#birthday").value = formatDate(customer.birthday);

      addCus.style.display = "none";
      updateCus.style.display = "flex";
      document.getElementById("id").disabled = true;

      // Store selected customer ID
      selectedCustomerId = customer.id;
    });

    tableBody.appendChild(row);
  });
}

function formatDate(date) {
  const [day, month, year] = date.split("/");
  return `${year}-${month}-${day}`; // Format to 'yyyy-mm-dd' for date picker
}

// Function to add a new customer
function addCustomer(id, name, family, email, birthday, phone, address) {
  const newCustomer = {
    // id: customers.length + 1, // Assign the next available ID
    id: id,
    name: name,
    family: family,
    email: email,
    birthday: birthday,
    phone: phone,
    address: address,
  };

  customers.push(newCustomer); // Add the new customer to the list
  renderCustomerTable(); // Re-render the customer table with the new customer
}

// Initial rendering of the customer table
renderCustomerTable();

// Expose the addCustomer function globally
window.addCustomer = addCustomer;

// Hide overlay form
closeFomrBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  removeBtn.style.display = "block";
  customerForm.reset();
});

removeBtn.addEventListener("click", () => {
  removeAlert.style.display = "block";
  closeFomrBtn.style.display = "none";
  document.getElementById("removeBtn").disabled = true;
  formElements.forEach((element) => (element.disabled = true));
});

cancelRemoveBtn.addEventListener("click", () => {
  removeAlert.style.display = "none";
  closeFomrBtn.style.display = "block";
  document.getElementById("removeBtn").disabled = false;
  formElements.forEach((element) => (element.disabled = false));
});

const confirmRemoveBtn = document.getElementById("confirmBtn");
const successMessageOnRemove = document.getElementById(
  "successMessageOnRemove"
);
const loadingSpinnerOnRemove = document.getElementById("loadingSpinneOnRemove");
const cardBody = document.querySelector(".card-body");
const importantNoticeHeader = document.querySelector(".card-header h3");

confirmRemoveBtn.addEventListener("click", () => {
  if (selectedCustomerId !== null) {
    // Hide card body elements
    cardBody.style.display = "none";

    // Change header text
    importantNoticeHeader.textContent = "Removing the record";

    // Display spinner
    loadingSpinnerOnRemove.classList.remove("d-none");

    // Simulate removal process with a 3-second delay
    setTimeout(() => {
      // Perform removal logic
      customers = customers.filter(
        (customer) => customer.id !== selectedCustomerId
      );
      renderCustomerTable(); // Re-render table

      // Hide spinner
      loadingSpinnerOnRemove.classList.add("d-none");

      // Change header text
      importantNoticeHeader.textContent = "The record was removed";

      // Show success message
      successMessageOnRemove.classList.remove("d-none");

      // Reset other UI elements after another delay (optional)
      setTimeout(() => {
        // Reset visibility of card body and header
        cardBody.style.display = "block";
        importantNoticeHeader.textContent = "Important Notice";

        // Hide success message
        successMessageOnRemove.classList.add("d-none");

        // Close the form and reset variables
        overlay.style.display = "none"; // Close the form
        removeBtn.style.display = "none"; // Hide "Remove" button
        customerForm.reset(); // Reset the form
        selectedCustomerId = null; // Reset selected ID
        closeFomrBtn.style.display = "block"; // Reset close button visibility
        removeAlert.style.display = "none";
        formElements.forEach((element) => (element.disabled = false));
      }, 3000); // Optional reset delay
    }, 3000); // Initial 3-second delay for removal
  }
});
updateCus.addEventListener("click", () => {
  if (selectedCustomerId !== null) {
    // Get updated values from the form
    const updatedName = document.querySelector("#firstName").value.trim();
    const updatedFamily = document.querySelector("#family").value.trim();
    const updatedEmail = document.querySelector("#email").value.trim();
    const updatedPhone = document.querySelector("#phone").value.trim();
    const updatedAddress = document.querySelector("#address").value.trim();
    const updatedBirthday = document.querySelector("#birthday").value;

    // Validate input (you can use the existing validation logic here)
    if (
      !updatedName.match(/^[A-Za-z]+$/) ||
      !updatedFamily.match(/^[A-Za-z]+$/) ||
      !updatedEmail.includes("@") ||
      !updatedPhone.match(/^\+972-[0-9]{9}$/)
    ) {
      errorBox.classList.remove("d-none");
      return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove("d-none");
    formElements.forEach((element) => (element.disabled = true));

    // Simulate a server response delay (3 seconds)
    setTimeout(() => {
      // Update the customer in the list
      const customerIndex = customers.findIndex(
        (customer) => customer.id === selectedCustomerId
      );
      if (customerIndex !== -1) {
        customers[customerIndex] = {
          ...customers[customerIndex],
          name: updatedName,
          family: updatedFamily,
          email: updatedEmail,
          phone: updatedPhone,
          address: updatedAddress,
          birthday: formatDateForDisplay(updatedBirthday),
        };

        // Re-render the customer table
        renderCustomerTable();

        // Hide loading spinner
        loadingSpinner.classList.add("d-none");

        // Show success message
        successMessage.innerHTML = "The record was updated successfully!";
        successMessage.classList.remove("d-none");
        setTimeout(() => {
          successMessage.classList.add("d-none");
          overlay.style.display = "none"; // Close the form
          customerForm.reset(); // Reset the form
          selectedCustomerId = null; // Clear the selected customer ID
          formElements.forEach((element) => (element.disabled = false));
        }, 2000); // Display success message for 2 seconds
      }
    }, 3000); // 3-second delay for loading spinner
  }
});

// Helper function to format date for display (if necessary)
function formatDateForDisplay(date) {
  const [year, month, day] = date.split("-");
  return `${day}/${month}/${year}`;
}
