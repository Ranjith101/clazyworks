const express = require('express');
const router = express.Router();
const db = require('../../db'); // Import your database connection
router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
      const query = 'SELECT * FROM Payments WHERE vendor_id = ?';
      db.query(query, [userId], (error, paymentInfoRows) => {
        if (error) {
          console.error('Error fetching payment information:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
        }
  
        if (paymentInfoRows && paymentInfoRows.length > 0) {
          const paymentInfo = paymentInfoRows[0]; // Access the first row of the result
          res.status(200).json(paymentInfo);
        } else {
          res.status(404).json({ message: 'Payment information not found for this user.' });
        }
      });
    } catch (error) {
      console.error('Error fetching payment information:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  });
  
module.exports = router;
