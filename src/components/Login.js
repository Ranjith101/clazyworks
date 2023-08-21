import React, {  useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import {  loginUser } from '../api/api';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/userSlice';
import '../styles/styles.css'


const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate= useNavigate();
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // React.useEffect(() => {
  //   const loggedInUser = localStorage.getItem('user');
  //   if (loggedInUser) {
  //     navigate('/payment'); // Redirect to the payment page if user is logged in
  //   }
  // }, []);
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
        dispatch(setUser(user));
        // Store user information in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        navigate('/vendor-register')

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

const img = "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png"



  return (
    <Container >
      <div className="user-icon-container">
        <img src={img} alt="User Icon" className="user-icon" />
      </div>
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Email or Mobile</Form.Label>
          <Form.Control
            type="text"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            className="form-control"
          />
        </Form.Group>
        <Form.Group className="form-group">
          <Form.Label className="form-label">Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </Form.Group>
        {error && <p className="error-message">{error}</p>}
        <div className="button-container">
          <Button variant="primary" type="submit" className="btn-primary">
            Login
          </Button>
        </div>
      </Form>
      <div className="link-container">
        <Link to="/register">Register</Link>
      </div>
    </Container>
  );
};

export default LoginPage;
