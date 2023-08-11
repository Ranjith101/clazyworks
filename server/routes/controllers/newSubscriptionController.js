const db = require('../../db');

const createNewSubscription = (req, res) => {
  const { planName, createdBy, modifiedBy } = req.body;

  const insertQuery = `
    INSERT INTO NeewSubscription1 (PlanName, CreatedBy, ModifiedBy)
    VALUES (?, ?, ?)`;

  const insertValues = [planName, createdBy, modifiedBy];

  db.query(insertQuery, insertValues, (insertErr) => {
    if (insertErr) {
      console.error('Error creating new subscription:', insertErr);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('New subscription created successfully');
      res.status(201).json({ message: 'New subscription created successfully' });
    }
  });
};

module.exports = {
  createNewSubscription,
};
