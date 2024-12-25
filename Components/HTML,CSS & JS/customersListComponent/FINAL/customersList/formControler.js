// const addCustomerBtn = document.getElementById("addCustomerBTN");
const showFormBtn = document.getElementById("addCustomerBTN");
const hideFormBtn = document.getElementById("closeFormBtn");
const updateCustomerBTN = document.getElementById("updateCustomerBtn");
const removeCustomerBTN = document.getElementById("removeCustomerBtn");
const addCustomerBTN = document.getElementById("addCustomerBtn");
const formHeaderTxt = document.getElementById("formHeader-txt");
const formOverlay = document.getElementById("formOverlay");
const form = document.getElementById("customerForm");
const formFields = form.querySelectorAll("input[required]");

showFormBtn.addEventListener("click", () => {
  formOverlay.style.display = "block";
  updateCustomerBTN.style.display = "none";
  removeCustomerBTN.style.display = "none";
  addCustomerBTN.style.display = "flex";
  formHeaderTxt.innerText = "New Customer";
  document.getElementById("id").disabled = false;
  document.getElementById("phone").disabled = false;
  document.getElementById("email").disabled = false;
  form.reset();
});
hideFormBtn.addEventListener("click", () => {
  formOverlay.style.display = "none";
});

const checkFormFields = () => {
  const allFieldsFilled = Array.from(formFields).every(
    (field) => field.value.trim() !== ""
  );
  addCustomerBTN.disabled = !allFieldsFilled;
  updateCustomerBTN.disabled = !allFieldsFilled;

  formFields.forEach((field) => {
    field.addEventListener("input", checkFormFields);
  });
};

checkFormFields();
