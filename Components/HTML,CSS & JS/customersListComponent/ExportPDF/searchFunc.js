function filterTable() {
  const input = document.getElementById("searchInput");
  const filter = input.value.toLowerCase();
  const table = document.getElementById("customersTableBody");
  const rows = table.getElementsByTagName("tr");
  const alertBox = document.getElementById("alertBox");
  const exportBtnContainer = document.getElementById("exportBtnContainer");
  const searchString = document.getElementById("searchString");
  let noMatch = true;

  // Iterate through table rows
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName("td");
    let found = false;

    for (let j = 0; j < cells.length; j++) {
      if (cells[j]) {
        const textValue = cells[j].textContent || cells[j].innerText;
        if (textValue.toLowerCase().includes(filter)) {
          found = true;
          break;
        }
      }
    }
    rows[i].style.display = found ? "" : "none";
    if (found) noMatch = false; // If any match is found, disable "no match"
  }

  // Show or hide alert + export BTN
  if (noMatch && filter) {
    alertBox.classList.remove("d-none");
    exportBtnContainer.style.display = "none";
    searchString.innerText = filter;
  } else {
    alertBox.classList.add("d-none");
    exportBtnContainer.style.display = "block";
  }
}
