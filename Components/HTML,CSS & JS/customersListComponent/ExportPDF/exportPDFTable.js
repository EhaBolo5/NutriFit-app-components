// const exportButton = document.getElementById("exportListBTN");

// // Add click event to export visible table rows to PDF
// exportButton.addEventListener("click", () => {
//   const { jsPDF } = window.jspdf;
//   const doc = new jsPDF();

//   // Title for the PDF
//   doc.setFontSize(18);
//   doc.text("Customers List", 14, 20);

//   // Get table headers
//   const headers = [];
//   document.querySelectorAll("thead th").forEach((header) => {
//     headers.push(header.textContent.trim());
//   });

//   // Get only visible rows from the table body
//   const rows = Array.from(document.querySelectorAll("#customersTableBody tr"))
//     .filter((row) => row.style.display !== "none") // Exclude hidden rows
//     .map((row) =>
//       Array.from(row.querySelectorAll("td")).map((cell) =>
//         cell.textContent.trim()
//       )
//     );

//   // Check if there's data to export
//   if (rows.length === 0) {
//     alert("No data available to export.");
//     return;
//   }

//   // Add table to the PDF using autoTable
//   doc.autoTable({
//     head: [headers], // Table headers
//     body: rows, // Filtered table data
//     startY: 30, // Vertical position for the table in the PDF
//   });

//   // Save the PDF
//   doc.save("Customers List.pdf");
// });
const exportButton = document.getElementById("exportListBTN");

// Add click event to export visible table rows to PDF
exportButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: "landscape", // Use landscape for wider tables
    unit: "pt", // Use points for precise sizing
    format: "A4", // A4 page size
  });

  // Title for the PDF
  const pageWidth = doc.internal.pageSize.getWidth(); // Get page width
  doc.setFontSize(18);
  doc.text("Customers List", pageWidth / 2, 30, { align: "center" }); // Center the title

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
    startY: 50, // Position the table below the title
    margin: { top: 50, left: 20, right: 20 }, // Add margins
    styles: {
      fontSize: 10, // Adjust font size for better fitting
      cellPadding: 4, // Add padding to cells
      halign: "center", // Center text horizontally in cells
      valign: "middle", // Center text vertically in cells
      lineColor: [0, 0, 0], // Black borders
      lineWidth: 0.2,
    },
    headStyles: {
      fillColor: [41, 128, 185], // Bootstrap primary color (blue)
      textColor: [255, 255, 255], // White text
      fontStyle: "bold", // Bold header text
      halign: "center", // Center header text
    },
    bodyStyles: {
      textColor: [0, 0, 0], // Black text
      halign: "center", // Center body text
      valign: "middle", // Center body text vertically
    },
    tableWidth: "auto", // Automatically adjust table width
  });

  // Save the PDF
  doc.save("Customers_List.pdf");
});
