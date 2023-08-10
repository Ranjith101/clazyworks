

// const db = require('../../db');

// const loginUser = (req, res) => {
//   const { emailOrMobile, password } = req.body;

//   const selectQuery = `
//     SELECT Users.id, Users.firstname, Users.lastname
//     FROM Users 
//     WHERE (Users.email = ? OR Users.mobile = ?) AND Users.password = ?`;
    
//   const selectValues = [emailOrMobile, emailOrMobile, password];

//   db.query(selectQuery, selectValues, (err, result) => {
//     if (err) {
//       console.error('Error logging in:', err);
//       res.status(500).json({ error: 'An error occurred' });
//     } else {
//       if (result.length === 1) {
//         const user = result[0];
        
//         // Insert user information into the Login table
//         const insertQuery = `
//           INSERT INTO Login (UserID, UserName, Password, IsGoogleAuth, Status, CreatedBy)
//           VALUES (?, ?, ?, ?, ?, ?)`;
        
//         const insertValues = [user.id, user.firstname, password, 'No', 'Active', user.id];

//         db.query(insertQuery, insertValues, (insertErr) => {
//           if (insertErr) {
//             console.error('Error inserting user data into Login table:', insertErr);
//           }

//           console.log('Login Successful:', user); // Log the user object for debugging
//           res.status(200).json({ message: 'Login successful', user });
//         });
//       } else {
//         console.log('Invalid Credentials'); // Log for debugging
//         res.status(401).json({ error: 'Invalid credentials' });
//       }
//     }
//   });
// };

// module.exports = {
//   loginUser,
// };

const db = require('../../db');

const loginUser = (req, res) => {
  const { emailOrMobile, password } = req.body;

  const selectQuery = `
    SELECT Users.id, Users.firstname, Users.lastname
    FROM Users 
    WHERE (Users.email = ? OR Users.mobile = ?) AND Users.password = ?`;
    
  const selectValues = [emailOrMobile, emailOrMobile, password];

  db.query(selectQuery, selectValues, (err, result) => {
    if (err) {
      console.error('Error logging in:', err);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (result.length === 1) {
        const user = result[0];
        
        // Insert user information into the Login table and set isLogged to 1
        const insertQuery = `
          INSERT INTO Login (UserID, UserName, Password, IsGoogleAuth, Status, isLogged, CreatedBy)
          VALUES (?, ?, ?, ?, ?, ?, ?)`;
        
        const insertValues = [user.id, user.firstname, password, 'No', 'Active', 1, user.id];

        db.query(insertQuery, insertValues, (insertErr) => {
          if (insertErr) {
            console.error('Error inserting user data into Login table:', insertErr);
          }

          console.log('Login Successful:', user); // Log the user object for debugging
          res.status(200).json({ message: 'Login successful', user });
        });
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
