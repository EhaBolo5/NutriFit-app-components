const exportButton = document.getElementById("exportBtn");

// Add click event to export visible table rows to PDF
exportButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Title for the PDF
  doc.setFontSize(18);
  doc.text("Customers List", 14, 20);

  // Get table headers
  const headers = [];
  document.querySelectorAll("thead th").forEach((header) => {
    headers.push(header.textContent.trim());
  });

  // Get only visible rows from the table body
  const rows = Array.from(document.querySelectorAll("#customersTableBody tr"))
    .filter((row) => row.style.display !== "none") // Exclude hidden rows
    .map((row) =>
      Array.from(row.querySelectorAll("td")).map((cell) =>
        cell.textContent.trim()
      )
    );

  // Check if there's data to export
  if (rows.length === 0) {
    alert("No data available to export.");
    return;
  }

  // Add table to the PDF using autoTable
  doc.autoTable({
    head: [headers], // Table headers
    body: rows, // Filtered table data
    startY: 30, // Vertical position for the table in the PDF
  });

  // Save the PDF
  doc.save("Customers List.pdf");
});
