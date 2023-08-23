const express = require('express');
const db = require('../../db');
const path = require('path'); // Import the 'path' module

const router = express.Router();

router.get('/verify-email', (req, res) => {
  const { verificationToken } = req.query;

  // Check if the verification token exists in the database
  const verifyQuery = 'UPDATE Users SET verified = true WHERE verification_token = ?';

  db.query(verifyQuery, [verificationToken], (verifyErr, verifyResult) => {
    if (verifyErr) {
      console.error('Error verifying email:', verifyErr);
      return res.status(500).json({ error: 'An error occurred during email verification' });
    }

    if (verifyResult.affectedRows === 0) {
      // Token not found in the database
      return res.status(404).json({ error: 'Invalid verification token' });
    }

    // Email successfully verified
    // Send the HTML page for redirection
    res.sendFile(path.join(__dirname, './views/verificationSuccess.html'));
  });
});

module.exports = {
  verifyEmail: router,
};
