import React, { useState, useEffect } from 'react';
import './YourStylesheet.css';
import Img from './img-login.svg'
import { Link, useNavigate } from 'react-router-dom';
import { registerUser, sendVerificationEmail, loginUser } from '../../api/api';
import axios from 'axios';
import { Alert, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/userSlice';

function LoginForm() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
      
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const [verificationToken, setVerificationToken] = useState(null);
    const [verificationError, setVerificationError] = useState('');
    const [isSignInVisible, setIsSignInVisible] = useState(true);
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [lpassword, setLPassword] = useState('');
    const [error, setError] = useState('');
    
    const toggleForm = () => {
        setIsSignInVisible(!isSignInVisible);
    };
  
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
            console.log(verificationError)
            // setVerificationError(error)
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
                setVerificationError('Email verification failed');
                // You can set a state variable to display an error message to the user if needed
                // Example:
            }
        } catch (error) {
            // Handle API request error
            console.error('Error verifying email:', error);
            setVerificationError('An error occurred while verifying your email. Please try again later.');
            // You can set a state variable to display an error message to the user if needed
            // Example: 
        }
    };


    const handleLogin = async (e) => {
        e.preventDefault();
      
        try {
          const response = await loginUser({
            emailOrMobile,
            lpassword,
          });
      
          if (response) {
            const { message, user } = response;
            alert(message); 
            dispatch(setUser(user));
            // Store user information in localStorage
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/dashboard')
    
            // You can store the user information in state or context for authenticated user session
            // console.log('Logged in user:', user);
          } else {
            console.error('Login response has no data:', response);
            setError('An error occurred while logging in');
          }
        } catch (error) {
          console.error('Error logging in:', error);
          setError(error.response.data.error);
        }
      };
    return (
        <div className="login">
            <div className="login__content">
                <div className="login__img">
                    <img src={Img} alt="Login" />
                </div>

                <div className="login__forms">
                    <form onSubmit={handleLogin} action="" className={isSignInVisible ? "login__registre" : "login__registre none"} id="login-in">
                        <h1 className="login__title">Sign In</h1>

                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="email/mobile" className="login__input" value={emailOrMobile} onChange={(e) => setEmailOrMobile(e.target.value)}/>
                        </div>

                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" className="login__input" value={lpassword} onChange={(e) => setLPassword(e.target.value)}/>
                        </div>
                        {error && <p className="error-message">{error}</p>}
                        {/* <a href="#" className="login__button">Sign In</a> */}
                        <Button variant="primary" type="submit" className="login__button">
            Login
          </Button>
                        <div>
                            <span className="login__account">Don't have an Account ?</span>
                            <span className="login__signin" onClick={toggleForm}>Sign Up</span>
                        </div>
                    </form>

                    <form onSubmit={handleSubmit} action="" className={isSignInVisible ? "login__create none" : "login__create block"} id="login-up">
                        <h1 className="login__title">Create Account</h1>

                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="First Name" className="login__input" onChange={(e) => setFirstname(e.target.value)} />
                        </div>

                        <div className="login__box">
                            <i className='bx bx-user login__icon'></i>
                            <input type="text" placeholder="Last Name" className="login__input" onChange={(e) => setLastname(e.target.value)} />
                        </div>

                        <div className="login__box">
                            <i className='bx bx-at login__icon'></i>
                            <input type="text" placeholder="Email" className="login__input" onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="login__box">
                            <i className='bx bx-mobile login__icon'></i>
                            <input type="text" placeholder="Mobile" className="login__input" onChange={(e) => setMobile(e.target.value)} />
                        </div>

                        <div className="login__box">
                            <i className='bx bx-lock-alt login__icon'></i>
                            <input type="password" placeholder="Password" className="login__input" onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        {emailSent && !verificationToken && (
                            <div>
                                <Alert variant="info">
                                    Registration successful! An email has been sent to your address for verification.
                                </Alert>
                                <div className="button-container">


                                </div>
                            </div>
                        )}
                        {verificationError && (
                            <div>
                                <Alert variant="danger">{verificationError}</Alert>
                            </div>
                        )}
                        {/* <a href="#" className="login__button" >Sign Up</a> */}
                        <Button variant="primary" type="submit" disabled={!isFormValid} className="login__button">
                            Register
                        </Button>
                        <div>
                            <span className="login__account">Already have an Account ?</span>
                            <span className="login__signup" onClick={toggleForm}>Sign In</span>
                        </div>

                        <div className="login__social">
                            <a href="#" className="login__social-icon"><i className='bx bxl-facebook' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-twitter' ></i></a>
                            <a href="#" className="login__social-icon"><i className='bx bxl-google' ></i></a>
                        </div>

                    </form>


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
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
