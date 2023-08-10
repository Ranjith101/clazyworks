const db = require('../../db');

const logoutUser = (req, res) => {
  const userId = req.user.id; // Assuming you have user data available in the request

  const updateQuery = `
    UPDATE Login 
    SET UserName = '', Password = '', IsGoogleAuth = 'No', Status = 'Inactive'
    WHERE UserID = ?`;
    
  db.query(updateQuery, [userId], (err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(200).json({ message: 'Logout successful' });
    }
  });
};

module.exports = {
  logoutUser,
};
