
const db = require('../../db');

const createNewVendorSubscription = (req, res) => {
  const { vendorId, subscriptionId, planName, price, startDate, endDate, status } = req.body;

  const insertQuery = `
    INSERT INTO NewVendorSubscription (VendorID, SubscriptionID, PlanName, Price, StartDate, EndDate, Status, CreatedBy, ModifiedBy)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  const values = [vendorId, subscriptionId, planName, price, startDate, endDate, status, vendorId, vendorId];

  db.query(insertQuery, values, (err) => {
    if (err) {
      console.error('Error creating new vendor subscription:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('New vendor subscription created successfully');
      res.status(201).json({ message: 'New vendor subscription created successfully' });
    }
  });
};

module.exports = {
  createNewVendorSubscription,
};
