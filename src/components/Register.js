import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { registerUser } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({
        firstname,
        lastname,
        email,
        mobile,
        password,
      });
      alert('User registered successfully');
      navigate('/');
      // You can redirect the user to another page here if needed
    } catch (error) {
      console.error('Error registering user:', error);
      alert('An error occurred while registering user');
    }
  };

  // Update the form validity state
  const updateFormValidity = () => {
    setIsFormValid(firstname && lastname && email && mobile && password);
  };

  // Call the form validation function whenever input values change
  React.useEffect(() => {
    updateFormValidity();
  }, [firstname, lastname, email, mobile, password]);
 
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  
  //   try {
  //     await registerUser({
  //       firstname,
  //       lastname,
  //       email,
  //       mobile,
  //       password,
  //     });
  //     alert('User registered successfully');
  //     navigate('/')
  //     // You can redirect the user to another page here if needed
  //   } catch (error) {
  //     console.error('Error registering user:', error);
  //     alert('An error occurred while registering user');
  //   }
  // };
 
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
        <Button variant="primary" type="submit" disabled={!isFormValid}>
          Register
        </Button>
      </Form>
      <Link to="/">Login</Link>
    </Container>
  );
};

export default RegisterPage;
