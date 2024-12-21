let selectedCustomerId = null;
const showFormBtn = document.getElementById("showFormBtn");
const overlay = document.getElementById("formOverlay");
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
  formElements.forEach((element) => (element.disabled = false));
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

closeFomrBtn.addEventListener("click", () => {
  overlay.style.display = "none";
  removeBtn.style.display = "block";
  customerForm.reset();
  formElements.forEach((element) => (element.disabled = false));
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
