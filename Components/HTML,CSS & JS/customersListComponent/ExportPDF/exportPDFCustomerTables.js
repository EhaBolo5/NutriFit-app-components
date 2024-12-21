const exportTablesButton = document.getElementById("exportTablesBTN");

// Add click event to export visible customers to a PDF
exportTablesButton.addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get visible rows from the table body
  const rows = Array.from(document.querySelectorAll("#customersTableBody tr"))
    .filter((row) => row.style.display !== "none") // Exclude hidden rows
    .map((row) => {
      const cells = Array.from(row.querySelectorAll("td"));
      return {
        id: cells[0]?.textContent.trim() || "N/A",
        name: cells[1]?.textContent.trim() || "N/A",
        family: cells[2]?.textContent.trim() || "N/A",
        email: cells[3]?.textContent.trim() || "N/A",
        phone: cells[4]?.textContent.trim() || "N/A",
        birthday: cells[5]?.textContent.trim() || "N/A", // Assuming birthday is in the 6th column
        address: cells[7]?.textContent.trim() || "N/A", // Assuming address is in the 7th column
      };
    });

  // Check if there are visible rows to export
  if (rows.length === 0) {
    alert("No data available to export.");
    return;
  }

  rows.forEach((customer, index) => {
    if (index !== 0) {
      doc.addPage(); // Add a new page for each customer except the first
    }

    // Title for the page (Customer Name)
    doc.setFontSize(18);
    doc.text(
      `${customer.name} ${customer.family}`,
      doc.internal.pageSize.getWidth() / 2,
      20,
      { align: "center" }
    );

    // Calculate the customer's age from the birthday
    let age = "N/A";
    if (customer.birthday !== "N/A") {
      const [day, month, year] = customer.birthday.split("/").map(Number);
      if (year) {
        const today = new Date();
        const birthDate = new Date(year, month - 1, day);
        age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          age--; // Adjust age if the birthday hasn't occurred yet this year
        }
      }
    }

    // Corrected customer table data
    const data = [
      ["Field", "Value"], // Header row
      ["ID", customer.id],
      ["Name", customer.name],
      ["Family", customer.family],
      ["Birthday", customer.birthday],
      ["Age", age],
      ["Email", customer.email],
      ["Phone", customer.phone],
      ["Address", customer.address],
    ];

    // Table styling
    doc.autoTable({
      head: [data[0]], // Header row
      body: data.slice(1), // Data rows
      startY: 30, // Position the table below the title
      styles: {
        font: "helvetica",
        textColor: [0, 0, 0], // Black text
        lineColor: [0, 0, 0], // Black borders
        lineWidth: 0.2,
      },
      headStyles: {
        fillColor: [41, 128, 185], // Bootstrap primary color (blue)
        textColor: [255, 255, 255], // White text
        fontStyle: "bold", // Bold header text
      },
      bodyStyles: {
        fillColor: [255, 255, 255], // White background
        textColor: [0, 0, 0], // Black text
      },
      columnStyles: {
        0: { fontStyle: "bold" }, // Make the "Field" column bold
      },
    });
  });

  // Save the PDF
  doc.save("Customers_List.pdf");
});
