const db = require('../../db');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config(); // Load environment variables from .env file

// Create a transporter with your SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const registerUser = (req, res) => {
  const { firstname, lastname, email, mobile, password } = req.body;

  // Generate a unique verification token
  const verificationToken = uuidv4();

  // Set the "verified" status to false initially
  const verified = false;

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
    const insertQuery = 'INSERT INTO Users (firstname, lastname, email, mobile, password, verification_token, verified) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const insertValues = [firstname, lastname, email, mobile, password, verificationToken, verified];

    db.query(insertQuery, insertValues, (insertErr, result) => {
      if (insertErr) {
        console.error('Error registering user:', insertErr);
        return res.status(500).json({ error: 'An error occurred' });
      }

      console.log('User registered:', result);

      // Send the verification email
      const verificationLink = `http://localhost:3001/api/verify-email?verificationToken=${verificationToken}`;

      const mailOptions = {
        from: 'snowj0940@gmail.com',
        to: email,
        subject: 'Email Verification',
        text: `Please click on the following link to verify your email: ${verificationLink}`,
      };

      transporter.sendMail(mailOptions, (mailErr, mailInfo) => {
        if (mailErr) {
          console.error('Error sending verification email:', mailErr);
          return res.status(500).json({ error: 'An error occurred while sending the verification email' });
        }

        console.log('Verification email sent:', mailInfo.response);
        return res.status(201).json({ message: 'User registered successfully' });
      });
    });
  });
};

module.exports = {
  registerUser,
};
