import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import VendorRegistrationPage from './components/VendorRegister';
import Payment_page from './components/razorpay/Payment';
import Products from './components/Products';

function App() {
  return (
    <Router>
      <div className="container">
        <div className='row'>
          <div className='col-md-6'>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
			        <Route path="/payment" element={<Payment_page />} />
              <Route path="/vendor-register" element={<VendorRegistrationPage />} />
              <Route path="/products" element={<Products />} />
            </Routes>
          </div>
        </div>      
      </div>
    </Router>
    // <div>
    //   <VendorRegistrationPage />
    // </div>
  );
}

export default App;

// import React, { useState } from "react";
// import axios from "axios";
// import "./App.css";

// function App() {
//   const [amount, setAmount] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (amount === "") {
//       alert("Please enter the amount");
//     } else {
//       try {
//         const orderUrl = "http://localhost:3001/api/payment/orders";
//         const orderResponse = await axios.post(orderUrl, {
//           amount: parseFloat(amount), // Convert amount to number
//         });

//         if (orderResponse.data.data) {
//           const order_id = orderResponse.data.data.id;

//           const options = {
//             key: "rzp_test_0exqW8wtRx0cbB",
//             amount: parseFloat(amount) * 100, // Convert amount to paise
//             currency: "INR",
//             name: "STARTUP_PROJECTS",
//             description: "For testing purpose",
//             order_id: order_id,
//             prefill: {
//               name: "Velmurugan",
//               email: "mvel1620r@gmail.com",
//               contact: "7904425033",
//             },
//             handler: async (response) => {
//               response.amount = parseFloat(amount) 
//               console.log(response);
//               // After successful payment, verify and store payment details
//               try {
//                 const verifyUrl = "http://localhost:3001/api/payment/verify";
//                 const verifyResponse = await axios.post(verifyUrl, {
//                   response,
//                   userId: 21, // Replace with actual user ID
//                   username: "Ranjith",
//                   amount: response.amount
//                   // payment_amount: parseFloat(amount)  // Replace with actual username
//                 });

//                 if (verifyResponse.data.message === "Payment verified and details stored") {
//                   alert("Payment verified and details stored");
//                 } else {
//                   alert("Payment verification failed");
//                 }
//               } catch (error) {
//                 console.log(error);
//                 alert("An error occurred during payment verification");
//               }
//             },
//             theme: {
//               color: "#3399cc",
//             },
//           };

//           const rzp1 = new window.Razorpay(options);
//           rzp1.open();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <h2>Razorpay Payment Integration Using React</h2>
//       <br />
//       <form onSubmit={handleSubmit}>
//         <input
//           type="number"
//           placeholder="Enter Amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <br />
//         <br />
//         <button type="submit">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default App;
