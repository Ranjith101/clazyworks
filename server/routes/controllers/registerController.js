const db = require('../../db');

const registerUser = (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body;

  const query = 'INSERT INTO users (firstname, lastname, email, mobile, password) VALUES (?, ?, ?, ?, ?)';
  const values = [firstname, lastname, email, mobile, password];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      console.log('User registered:', result);
      res.status(201).json({ message: 'User registered successfully' });
    }
  });
};

module.exports = {
  registerUser,
};
