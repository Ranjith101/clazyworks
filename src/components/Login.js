

import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { loginUser } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const navigate= useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await loginUser({
        emailOrMobile,
        password,
      });
  
      if (response) {
        const { message, user } = response;
        alert(message); 
        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/payment')

        // You can store the user information in state or context for authenticated user session
        console.log('Logged in user:', user);
      } else {
        console.error('Login response has no data:', response);
        setError('An error occurred while logging in');
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid credentials');
    }
  };
  

  return (
    <Container>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Email or Mobile</Form.Label>
          <Form.Control
            type="text"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
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
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
      <Link to="/register">Register</Link>
    </Container>
  );
};

export default LoginPage;
