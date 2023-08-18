const db = require('../../db');

const createNewVendorSubscription = (req, res) => {
  const { vendorId, subscriptionId, planName, price, startDate, endDate, status } = req.body;

  const insertQuery = `
    INSERT INTO VendorSubscription (VendorID, SubscriptionID, PlanName, Price, StartDate, EndDate, Status, CreatedBy, ModifiedBy)
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ? 
    FROM dual
    WHERE EXISTS (SELECT 1 FROM Vendor WHERE VendorID = ?)`;

  const values = [vendorId, subscriptionId, planName, price, startDate, endDate, status, vendorId, vendorId, vendorId];

  db.query(insertQuery, values, (err, result) => {
    if (err) {
      console.error('Error creating new vendor subscription:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.affectedRows === 0) {
        // If no rows were affected (vendor doesn't exist), return an error
        res.status(404).json({ error: 'Vendor not found' });
      } else {
        console.log('New vendor subscription created successfully');
        res.status(201).json({ message: 'New vendor subscription created successfully' });
      }
    }
  });
};

module.exports = {
  createNewVendorSubscription,
};
