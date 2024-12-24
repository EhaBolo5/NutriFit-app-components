// const addCustomerBtn = document.getElementById("addCustomerBTN");
const showFormBtn = document.getElementById("addCustomerBTN");
const hideFormBtn = document.getElementById("closeFormBtn");
const updateCustomerBTN = document.getElementById("updateCustomerBtn");
const removeCustomerBTN = document.getElementById("removeCustomerBtn");
const addCustomerBTN = document.getElementById("addCustomerBtn");
const formHeaderTxt = document.getElementById("formHeader-txt");
const formOverlay = document.getElementById("formOverlay");
const form = document.getElementById("customerForm");

showFormBtn.addEventListener("click", () => {
  formOverlay.style.display = "block";
  updateCustomerBTN.style.display = "none";
  removeCustomerBTN.style.display = "none";
  addCustomerBTN.style.display = "flex";
  formHeaderTxt.innerText = "New Customer";
  document.getElementById("id").disabled = false;
  form.reset();
});
hideFormBtn.addEventListener("click", () => {
  formOverlay.style.display = "none";
});
