// import axios from "axios";
// import { useState } from "react";
// import "../../App.css";

// const Payment_page = () => {
//   const [selectedPlan, setSelectedPlan] = useState(null);

//   const plans = [
//     { id: "Silver Plan", name: "Silver Plan", price: 299 },
//     { id: "Gold Plan", name: "Gold Plan", price: 499 },
//     { id: "Platinum Plan", name: "Platinum Plan", price: 799 },
//   ];

//   const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
//   console.log(userFromLocalStorage,"userFromLocalStorage")
//   // Replace with actual user information
//   const user = {
//     id: userFromLocalStorage.id, // Example user ID
//     name: userFromLocalStorage.firstname, // Example user name
//     // ... other user properties
//   };

//   const initPayment = async (data) => {
//     const options = {
//       key: "rzp_test_0exqW8wtRx0cbB",
//       amount: data.amount,
//       currency: data.currency,
//       name: selectedPlan.name,
//       description: "Subscription Payment",
//       order_id: data.id,
//       prefill: {
//         email: user.email, // Provide user's email
//         contact: user.contact, // Provide user's contact number
//       },
//       handler: async (response) => {
//         try {
//           const verifyUrl = "http://localhost:3001/api/payment/verify";
//           const verificationPayload = {
//             response,
//             userId: user.id, // Add user ID to the payload
//             username: user.name, // Add username to the payload
//           };
          
//           const { data } = await axios.post(verifyUrl, verificationPayload);
//           console.log(data);
//         } catch (error) {
//           console.log(error);
//         }
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };
//     console.log(options)
//     const rzp1 = new window.Razorpay(options);
//     rzp1.open();
//   };

//   const handlePayment = async () => {
//     if (selectedPlan) {
//       try {
//         const orderUrl = "http://localhost:3001/api/payment/orders";
//         const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
//         const { data } = await axios.post(orderUrl, {
//           amount: selectedPlanData.price,
//         });
//         console.log(data);

//         const amountInPaise = data.data.amount; // Convert to number
//         console.log(amountInPaise);
//         if (!isNaN(amountInPaise)) {
//           // Ensure the amount is a valid number
//           initPayment({
//             amount: amountInPaise, // Amount in paise
//             currency: "INR",
//             id: data.data.id,
//           });

//           // After successful payment, also create a new subscription
//           const subscriptionApiUrl = "http://localhost:3001/api/subscription/create";
//           const subscriptionData = {
//             planName: selectedPlanData.name,
//             createdBy: user.id,
//             modifiedBy: user.id,
//           };
//           await axios.post(subscriptionApiUrl, subscriptionData);
//         } else {
//           console.log("Invalid amount received from server");
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } else {
//       console.log("No plan selected");
//     }
//   };

  
//   return (
//     <div className="App">
//       <div className="subscription_container">
//         <h2>Select a Subscription Plan</h2>
//         <div className="plan_options">
//           {plans.map((plan) => (
//             <div
//               key={plan.id}
//               className={`plan ${selectedPlan === plan.id ? "selected" : ""}`}
//               onClick={() => setSelectedPlan(plan.id)}
//             >
//               <h3>{plan.name}</h3>
//               <p>&#x20B9; {plan.price}</p>
//             </div>
//           ))}
//         </div>
//         <button onClick={handlePayment} className="buy_btn" disabled={!selectedPlan}>
//           Subscribe
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment_page;

// import React, { useState } from "react";
// import axios from "axios";
// // import "./App.css";

// const Payment_page = () => {
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

// export default Payment_page;


import React, { useState } from "react";
import axios from "axios";

const SubscriptionPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    { id: "Silver Plan", name: "Silver Plan", price: 299 },
    { id: "Gold Plan", name: "Gold Plan", price: 499 },
    { id: "Platinum Plan", name: "Platinum Plan", price: 799 },
  ];
  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  console.log(userFromLocalStorage,"userFromLocalStorage")
  // Replace with actual user information
  const user = {
    id: userFromLocalStorage.id, // Example user ID
    name: userFromLocalStorage.firstname, // Example user name
    // ... other user properties
  };

  const handlePayment = async (selectedPlanId) => {
    try {
      const plan = plans.find((plan) => plan.id === selectedPlanId);
      const orderUrl = "http://localhost:3001/api/payment/orders";
      const orderResponse = await axios.post(orderUrl, {
        amount: plan.price,
      });

      if (orderResponse.data.data) {
        const order_id = orderResponse.data.data.id;

        const options = {
          key: "rzp_test_0exqW8wtRx0cbB",
          amount: plan.price * 100,
          currency: "INR",
          name: "STARTUP_PROJECTS",
          description: "Subscription Payment",
          order_id: order_id,
          prefill: {
            name: "Velmurugan",
            email: "mvel1620r@gmail.com",
            contact: "7904425033",
          },
          handler: async (response) => {
            response.amount = plan.price;
            console.log(response);
            // After successful payment, verify and store payment details
            try {
              const verifyUrl = "http://localhost:3001/api/payment/verify";
              const verifyResponse = await axios.post(verifyUrl, {
                response,
                userId: user.id, // Replace with actual user ID
                username: user.name,
                amount: plan.price,
              });

              if (verifyResponse.data.message === "Payment verified and details stored") {
                alert("Payment verified and details stored");
              } else {
                alert("Payment verification failed");
              }
            } catch (error) {
              console.log(error);
              alert("An error occurred during payment verification");
            }
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp1 = new window.Razorpay(options);
        rzp1.open();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <h2>Choose a Subscription Plan</h2>
      <div className="subscription_plans">
        {plans.map((plan) => (
          <div key={plan.id} className="subscription_plan">
            <h3>{plan.name}</h3>
            <p>&#x20B9; {plan.price}</p>
            <button onClick={() => handlePayment(plan.id)}>Select Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPage;
