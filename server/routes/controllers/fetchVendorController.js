const db = require('../../db');

const getVendorById = (req, res) => {
  const vendorId = req.params.vendorId; // Extract the vendor ID from the URL parameter
  const selectQuery = 'SELECT * FROM Vendor WHERE VendorID = ?';

  db.query(selectQuery, [vendorId], (err, result) => {
    if (err) {
      console.error('Error fetching vendor:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else if (result.length === 0) {
      res.status(404).json({ error: 'Vendor not found' });
    } else {
      res.status(200).json(result[0]);
    }
  });
};

module.exports = {
  getVendorById,
};
