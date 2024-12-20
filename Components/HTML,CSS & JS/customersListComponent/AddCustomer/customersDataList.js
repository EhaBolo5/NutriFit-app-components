// Initial list of customers
let customers = [
    {
        id: 1,
        name: "John",
        family: "Doe",
        email: "john.doe1@example.com",
        phone: "+972-501234567",
      },
      {
        id: 2,
        name: "Jane",
        family: "Smith",
        email: "jane.smith2@example.com",
        phone: "+972-502345678",
      },
      {
        id: 3,
        name: "Bob",
        family: "Brown",
        email: "bob.brown3@example.com",
        phone: "+972-503456789",
      },
      {
        id: 4,
        name: "Alice",
        family: "Johnson",
        email: "alice.johnson4@example.com",
        phone: "+972-504567890",
      },
      {
        id: 5,
        name: "Michael",
        family: "Williams",
        email: "michael.williams5@example.com",
        phone: "+972-505678901",
      },
      {
        id: 6,
        name: "Sarah",
        family: "Taylor",
        email: "sarah.taylor6@example.com",
        phone: "+972-506789012",
      },
      {
        id: 7,
        name: "Chris",
        family: "Evans",
        email: "chris.evans7@example.com",
        phone: "+972-507890123",
      },
      {
        id: 8,
        name: "Emma",
        family: "Wilson",
        email: "emma.wilson8@example.com",
        phone: "+972-508901234",
      },
      {
        id: 9,
        name: "David",
        family: "Clark",
        email: "david.clark9@example.com",
        phone: "+972-509012345",
      },
      {
        id: 10,
        name: "Olivia",
        family: "Martinez",
        email: "olivia.martinez10@example.com",
        phone: "+972-501122334",
      },
      {
        id: 11,
        name: "James",
        family: "Garcia",
        email: "james.garcia11@example.com",
        phone: "+972-502233445",
      },
      {
        id: 12,
        name: "Sophia",
        family: "Anderson",
        email: "sophia.anderson12@example.com",
        phone: "+972-503344556",
      },
      {
        id: 13,
        name: "Liam",
        family: "Thomas",
        email: "liam.thomas13@example.com",
        phone: "+972-504455667",
      },
      {
        id: 14,
        name: "Ava",
        family: "Lee",
        email: "ava.lee14@example.com",
        phone: "+972-505566778",
      },
      {
        id: 15,
        name: "Noah",
        family: "Walker",
        email: "noah.walker15@example.com",
        phone: "+972-506677889",
      },
      {
        id: 16,
        name: "Isabella",
        family: "Hall",
        email: "isabella.hall16@example.com",
        phone: "+972-507788990",
      },
      {
        id: 17,
        name: "Ethan",
        family: "Allen",
        email: "ethan.allen17@example.com",
        phone: "+972-508899001",
      },
      {
        id: 18,
        name: "Mia",
        family: "Young",
        email: "mia.young18@example.com",
        phone: "+972-509900112",
      },
      {
        id: 19,
        name: "Alexander",
        family: "Harris",
        email: "alexander.harris19@example.com",
        phone: "+972-501223344",
      },
      {
        id: 20,
        name: "Charlotte",
        family: "King",
        email: "charlotte.king20@example.com",
        phone: "+972-502334455",
      },
    // Additional customers omitted for brevity...
  ];
  
  // Get table body element
  const tableBody = document.getElementById("customersTableBody");
  
  // Function to render the customer table
  function renderCustomerTable() {
    tableBody.innerHTML = ""; // Clear the existing table content
  
    const sortedCustomers = customers.sort((a, b) => b.id - a.id); // Sort customers by id in descending order
  
    sortedCustomers.forEach((customer) => {
      const row = document.createElement("tr");
      row.innerHTML = `
              <td>${customer.id}</td>
              <td>${customer.name}</td>
              <td>${customer.family}</td>
              <td>${customer.email}</td>
              <td>${customer.phone}</td>
          `;
      tableBody.appendChild(row);
    });
  }
  
  // Function to add a new customer
  function addCustomer(name, family, email, phone) {
    const newCustomer = {
      id: customers.length + 1, // Assign the next available ID
      name: name,
      family: family,
      email: email,
      phone: phone,
    };
  
    customers.push(newCustomer); // Add the new customer to the list
    renderCustomerTable(); // Re-render the customer table with the new customer
  }
  
  // Initial rendering of the customer table
  renderCustomerTable();
  
  // Expose the addCustomer function globally
  window.addCustomer = addCustomer;
  