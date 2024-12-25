// const addCustomerBtn = document.getElementById("addCustomerBTN");
const showFormBtn = document.getElementById("addCustomerBTN");
const hideFormBtn = document.getElementById("closeFormBtn");
const updateCustomerBTN = document.getElementById("updateCustomerBtn");
const removeCustomerBTN = document.getElementById("removeCustomerBtn");
const addCustomerBTN = document.getElementById("addCustomerBtn");
const formHeaderTxt = document.getElementById("formHeader-txt");
const formOverlay = document.getElementById("formOverlay");
const noticeAlert = document.getElementById("importantNoticeAlert");
const cancelAlert = document.getElementById("cancelBtn");
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
  document.getElementById("name").disabled = false;
  document.getElementById("family").disabled = false;
  document.getElementById("birthday").disabled = false;
  document.getElementById("address").disabled = false;
  form.reset();
});
hideFormBtn.addEventListener("click", () => {
  formOverlay.style.display = "none";
});

removeCustomerBTN.addEventListener("click", () => {
  document.getElementById("name").disabled = true;
  document.getElementById("family").disabled = true;
  document.getElementById("birthday").disabled = true;
  document.getElementById("address").disabled = true;
  updateCustomerBTN.disabled = true;
  noticeAlert.classList.remove("d-none");
  hideFormBtn.classList.add("d-none");
  document.querySelector(".card-body p").classList.remove("d-none"); // Hide the text
  document
    .getElementById("importnantNoticeBTNsContainer")
    .classList.remove("d-none");
});
cancelAlert.addEventListener("click", () => {
  document.getElementById("name").disabled = false;
  document.getElementById("family").disabled = false;
  document.getElementById("birthday").disabled = false;
  document.getElementById("address").disabled = false;
  noticeAlert.classList.add("d-none");
  hideFormBtn.classList.remove("d-none");
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
