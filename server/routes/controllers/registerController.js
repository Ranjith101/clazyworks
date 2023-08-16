const db = require('../../db');

const registerUser = (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body;

  // Check if email or mobile number already exists in the database
  const checkQuery = 'SELECT * FROM Users WHERE email = ? OR mobile = ?';
  const checkValues = [email, mobile];

  db.query(checkQuery, checkValues, (checkErr, checkResult) => {
    if (checkErr) {
      console.error('Error checking email/mobile duplication:', checkErr);
      return res.status(500).json({ error: 'An error occurred' });
    }

    if (checkResult.length > 0) {
      // If email or mobile number is already registered
      return res.status(400).json({ error: 'Email or mobile number already registered' });
    }

    // If email and mobile are not registered, proceed with registration
    const insertQuery = 'INSERT INTO Users (firstname, lastname, email, mobile, password) VALUES (?, ?, ?, ?, ?)';
    const insertValues = [firstname, lastname, email, mobile, password];

    db.query(insertQuery, insertValues, (insertErr, result) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        return res.status(500).json({ error: 'An error occurred' });
      }
      console.log('User registered:', result);
      return res.status(201).json({ message: 'User registered successfully' });
    });
  });
};

module.exports = {
  registerUser,
};
