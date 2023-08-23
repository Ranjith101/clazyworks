import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmailVerificationPage = () => {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5); // 5 seconds countdown

//   useEffect(() => {
//     // Start the countdown
//     const timer = setInterval(() => {
//       if (countdown > 0) {
//         setCountdown(countdown - 1);
//       } else {
//         // Countdown has expired, navigate to the login page
//         clearInterval(timer);
//         navigate('/');
//       }
//     }, 1000);

//     // Cleanup the timer when the component unmounts
//     return () => {
//       clearInterval(timer);
//     };
//   }, [countdown, navigate]);

  
  useEffect(() => {
    // Make an API request to verify the email using the verificationToken
    axios
      .get(`http://localhost:3001/api/verify-email?verificationToken=${verificationToken}`)
      .then((response) => {
        // Check if verification was successful
        if (response.status === 200) {
          // Email is verified, you can display a success message
          // and navigate the user to the login page
          navigate('/');
        } else {
          // Verification failed, display an error message or handle as needed
          // You can set up state to display error messages to the user
        }
      })
      .catch((error) => {
        // Handle API request error
        console.error('Error verifying email:', error);
        // You can set up state to display error messages to the user
      });
  }, [verificationToken, navigate]);
  return (
    <div>
      <h2>Email Verification Page</h2>
      <p>Redirecting to login page in {countdown} seconds...</p>
    </div>
  );
};

export default EmailVerificationPage;
