const db = require('../../db');

const loginUser = (req, res) => {
  const { emailOrMobile, lpassword } = req.body;

  const selectQuery = `
    SELECT Users.id, Users.firstname, Users.lastname, Users.verified
    FROM Users 
    WHERE (Users.email = ? OR Users.mobile = ?) AND Users.password = ?`;
    
  const selectValues = [emailOrMobile, emailOrMobile, lpassword];

  db.query(selectQuery, selectValues, (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length === 1) {
        const user = result[0];

        if (user.verified === 1) {
          // User's email is verified, allow login
          // Insert user information into the Login table and set isLogged to 1
          const insertQuery = `
            INSERT INTO Login (UserID, UserName, Password, IsGoogleAuth, Status, isLogged, CreatedBy)
            VALUES (?, ?, ?, ?, ?, ?, ?)`;
          
          const insertValues = [user.id, user.firstname, lpassword, 'No', 'Active', 1, user.id];

          db.query(insertQuery, insertValues, (insertErr) => {
            if (insertErr) {
              console.error('Error inserting user data into Login table:', insertErr);
            }

            console.log('Login Successful:', user); // Log the user object for debugging
            res.status(200).json({ message: 'Login successful', user });
          });
        } else {
          // User's email is not verified, prevent login
          console.log('Email not verified for user:', user); // Log for debugging
          res.status(401).json({ error: 'Email not verified' });
        }
      } else {
        console.log('Invalid Credentials'); // Log for debugging
        res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  });
};

module.exports = {
  loginUser,
};
