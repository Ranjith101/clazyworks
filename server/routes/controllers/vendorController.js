const db = require('../../db');

const registerVendor = (req, res) => {
  const { userId, firstname, lastname, email, mobile, ...vendorData } = req.body;

  const insertQuery = `
    INSERT INTO Vendor (VendorID, FirstName, LastName, Gender, MobileNo, EmailId, Address1, Address2, Area, City, State, Country, PinCode, Status, CreatedBy, ModifiedBy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    userId,
    firstname,
    lastname,
    vendorData.gender,
    mobile,
    email,
    vendorData.address1,
    vendorData.address2,
    vendorData.area,
    vendorData.city,
    vendorData.state,
    vendorData.country,
    vendorData.pinCode,
    vendorData.status || 'Active', // Default value if not provided
    userId,
    userId,
  ];

  db.query(insertQuery, values, (err) => {
    if (err) {
      console.error('Error registering vendor:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      // Retrieve the registered vendor data from the database
      const selectQuery = `
        SELECT * FROM Vendor WHERE VendorID = ?`;

      db.query(selectQuery, [userId], (selectErr, result) => {
        if (selectErr) {
          console.error('Error retrieving registered vendor data:', selectErr);
          res.status(500).json({ error: 'An error occurred while retrieving vendor data' });
        } else {
          console.log('Vendor registered successfully');
          const registeredVendor = result[0]; // Assuming the result contains the vendor data

          res.status(201).json({ message: 'Vendor registered successfully', vendor: registeredVendor });
        }
      });
    }
  });
};

module.exports = {
  registerVendor,
};
