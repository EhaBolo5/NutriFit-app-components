// const today = new Date();

// // Calculate the minimum date (18 years ago) for the `min` attribute
// const minDate = new Date(today);
// minDate.setFullYear(today.getFullYear() - 18); // Subtract 18 years to set the min date

// // Calculate the maximum date (80 years ago) for the `max` attribute
// const maxDate = new Date(today);
// maxDate.setFullYear(today.getFullYear() - 80); // Subtract 80 years to set the max date

// // Function to format the date to YYYY-MM-DD format
// const formatDate = (date) => {
//   const year = date.getFullYear();
//   const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
//   const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
//   return `${year}-${month}-${day}`;
// };

// // Set the `min` and `max` attributes of the date picker
// document.getElementById("birthday").setAttribute("min", formatDate(maxDate)); // Max age: 80 years
// document.getElementById("birthday").setAttribute("max", formatDate(minDate)); // Min age: 18 years
document.addEventListener("DOMContentLoaded", () => {
  const today = new Date();

  // Calculate the minimum date (18 years ago) for the `max` attribute
  const minDate = new Date(today);
  minDate.setFullYear(today.getFullYear() - 18); // Subtract 18 years to set the max date (youngest age)

  // Calculate the maximum date (80 years ago) for the `min` attribute
  const maxDate = new Date(today);
  maxDate.setFullYear(today.getFullYear() - 80); // Subtract 80 years to set the min date (oldest age)

  // Function to format the date to YYYY-MM-DD format
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
    const day = String(date.getDate()).padStart(2, "0"); // Add leading zero if needed
    return `${year}-${month}-${day}`;
  };

  // Set the `min` and `max` attributes of the date picker
  const birthdayInput = document.getElementById("birthday");
  birthdayInput.setAttribute("min", formatDate(maxDate)); // Max age: 80 years
  birthdayInput.setAttribute("max", formatDate(minDate)); // Min age: 18 years

  console.log("Max age (min date):", formatDate(maxDate));
  console.log("Min age (max date):", formatDate(minDate));
});
