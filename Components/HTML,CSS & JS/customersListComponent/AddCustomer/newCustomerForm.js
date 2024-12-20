// const showFormBtn = document.getElementById("showFormBtn");
// const overlay = document.getElementById("overlay");
// const cancelBtn = document.getElementById("cancelBtn");
// const errorBox = document.getElementById("errorBox");
// const customerForm = document.getElementById("customerForm");
// const loadingSpinner = document.getElementById("loadingSpinner");
// const successMessage = document.getElementById("successMessage");
// const customerTable = document.getElementById("customerTable");

// // Show overlay form
// showFormBtn.addEventListener("click", () => {
//   overlay.style.display = "flex";
//   errorBox.classList.add("d-none");
//   successMessage.classList.add("d-none");
//   loadingSpinner.classList.add("d-none");
// });

// // Hide overlay form
// cancelBtn.addEventListener("click", () => {
//   overlay.style.display = "none";
//   customerForm.reset();
// });

// // Form validation logic (simplified)
// customerForm.addEventListener("submit", function (event) {
//   event.preventDefault(); // Prevent form submission
//   let isValid = true;

//   // Example validation for a few fields
//   const firstName = document.getElementById("firstName").value.trim();
//   const family = document.getElementById("family").value.trim();
//   const email = document.getElementById("email").value.trim();
//   const phone = document.getElementById("phone").value.trim();

//   // Reset previous errors
//   document.getElementById("firstNameError").innerText = "";
//   document.getElementById("familyError").innerText = "";
//   document.getElementById("emailError").innerText = "";
//   document.getElementById("phoneError").innerText = "";

//   if (!firstName.match(/^[A-Za-z]+$/)) {
//     document.getElementById("firstNameError").innerText = "Invalid first name.";
//     isValid = false;
//   }
//   if (!family.match(/^[A-Za-z]+$/)) {
//     document.getElementById("familyError").innerText = "Invalid family name.";
//     isValid = false;
//   }
//   if (!email.includes("@")) {
//     document.getElementById("emailError").innerText = "Invalid email.";
//     isValid = false;
//   }
//   if (!phone.match(/^\+972-[0-9]{9}$/)) {
//     document.getElementById("phoneError").innerText = "Invalid phone number.";
//     isValid = false;
//   }

//   if (isValid) {
//     // Show spinner for 5 seconds before adding customer
//     loadingSpinner.classList.remove("d-none");
//     setTimeout(() => {
//       // Add new customer to the table
//       const newRow = document.createElement("tr");

//       const newRowContent = `
//             <td style="text-align: center;">${
//               customerTable.rows.length + 1
//             }</td>
//             <td style="text-align: center;">${firstName}</td>
//             <td style="text-align: center;">${family}</td>
//             <td style="text-align: center;">${email}</td>
//             <td style="text-align: center;">${phone}</td>
//          `;
//       newRow.innerHTML = newRowContent;
//       customerTable.appendChild(newRow);

//       // Hide spinner and show success message
//       loadingSpinner.classList.add("d-none");
//       successMessage.classList.remove("d-none");
//       customerForm.reset(); // Reset the form fields

//       // Hide the success message after 3 seconds and close form
//       setTimeout(() => {
//         successMessage.classList.add("d-none");
//         overlay.style.display = "none";
//       }, 3000);
//     }, 5000); // Simulate a 5-second server response
//   } else {
//     errorBox.classList.remove("d-none");
//   }
// });
const showFormBtn = document.getElementById("showFormBtn");
const overlay = document.getElementById("overlay");
const cancelBtn = document.getElementById("cancelBtn");
const errorBox = document.getElementById("errorBox");
const customerForm = document.getElementById("customerForm");
const loadingSpinner = document.getElementById("loadingSpinner");
const successMessage = document.getElementById("successMessage");

// Show overlay form
showFormBtn.addEventListener("click", () => {
  overlay.style.display = "flex";
  errorBox.classList.add("d-none");
  successMessage.classList.add("d-none");
  loadingSpinner.classList.add("d-none");
});

// Hide overlay form
cancelBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  customerForm.reset();
});

// Form validation logic (simplified)
customerForm.addEventListener("submit", function (event) {
  event.preventDefault(); // Prevent form submission
  let isValid = true;

  // Example validation for a few fields
  const firstName = document.getElementById("firstName").value.trim();
  const family = document.getElementById("family").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();

  // Reset previous errors
  document.getElementById("firstNameError").innerText = "";
  document.getElementById("familyError").innerText = "";
  document.getElementById("emailError").innerText = "";
  document.getElementById("phoneError").innerText = "";

  if (!firstName.match(/^[A-Za-z]+$/)) {
    document.getElementById("firstNameError").innerText = "Invalid first name.";
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
    setTimeout(() => {
      // Add the new customer to the list in b.js
      if (typeof addCustomer === "function") {
        addCustomer(firstName, family, email, phone); // Add customer to b.js list
      }

      // Hide spinner and show success message
      loadingSpinner.classList.add("d-none");
      successMessage.classList.remove("d-none");
      customerForm.reset(); // Reset the form fields

      // Hide the success message after 3 seconds and close form
      setTimeout(() => {
        successMessage.classList.add("d-none");
        overlay.style.display = "none";
      }, 3000);
    }, 5000); // Simulate a 5-second server response
  } else {
    errorBox.classList.remove("d-none");
  }
});
