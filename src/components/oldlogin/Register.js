import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { registerUser, sendVerificationEmail } from '../api/api'; // Update the import to include the sendVerificationEmail function
import { Link, useNavigate } from 'react-router-dom';
import '../styles/styles.css';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [verificationToken, setVerificationToken] = useState(null);
  const [verificationError, setVerificationError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser({
        firstname,
        lastname,
        email,
        mobile,
        password,
      });

      // Get the verification token from the response if available
      if (response && response.data && response.data.verificationToken) {
        setVerificationToken(response.data.verificationToken);
      }

      // Notify the user that the registration was successful
      setEmailSent(true);
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user');
    }
  };

  const sendVerification = async () => {
    try {
      await sendVerificationEmail(email);

      // Notify the user that the verification email has been sent
      setEmailSent(true);
    } catch (error) {
      console.error('Error sending verification email:', error);
      alert('An error occurred while sending the verification email');
    }
  };

  useEffect(() => {
    // Update the form validity state whenever input values change
    setIsFormValid(firstname && lastname && email && mobile && password);
  }, [firstname, lastname, email, mobile, password]);

  // Handle email verification when the verification token is available
  useEffect(() => {
    if (verificationToken) {
      // Send the verification token to your server for email verification
      verifyEmail(verificationToken);
    }
  }, [verificationToken]);

  const verifyEmail = async (token) => {
    try {
      // Make an API call to verify the email using the token
      const response = await axios.get(`http://locahost:3001/api/verify-email?verificationToken=${token}`);
      
      // Check if verification was successful based on the response status
      if (response.status === 200) {
        // Email is successfully verified
        console.log('Email successfully verified');
        
        // You can set a state variable to display a success message to the user if needed
        // Example: setEmailVerificationSuccess(true);
        
        // Redirect the user to the login page or another appropriate page
        navigate('/');
      } else {
        // Verification failed, display an error message or handle as needed
        console.error('Email verification failed');
        
        // You can set a state variable to display an error message to the user if needed
        // Example: setVerificationError('Email verification failed');
      }
    } catch (error) {
      // Handle API request error
      console.error('Error verifying email:', error);
      
      // You can set a state variable to display an error message to the user if needed
      // Example: setVerificationError('An error occurred while verifying your email. Please try again later.');
    }
  };
  

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Mobile</Form.Label>
          <Form.Control
            type="text"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="button-container">
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            Register
          </Button>
        </div>
      </Form>
      {emailSent && !verificationToken && (
        <div>
          <Alert variant="info">
            Registration successful! An email has been sent to your address for verification.
          </Alert>
          <div className="button-container">
            <Button variant="primary" onClick={sendVerification}>
              Resend Verification Email
            </Button>
          </div>
        </div>
      )}
      {verificationToken && (
        <div>
          <Alert variant="success">
            Email verification successful! You can now <Link to="/">login</Link>.
          </Alert>
        </div>
      )}
      {verificationError && (
        <div>
          <Alert variant="danger">{verificationError}</Alert>
        </div>
      )}
      <div className="link-container">
        <Link to="/">Login</Link>
      </div>
    </Container>
  );
};

export default RegisterPage;
