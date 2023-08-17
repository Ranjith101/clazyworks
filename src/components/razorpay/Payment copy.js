import axios from "axios";
import { useState } from "react";
import "../../App.css";

const Payment_page = () => {
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

  const initPayment = async (data) => {
    const options = {
      key: "rzp_test_0exqW8wtRx0cbB",
      amount: data.amount,
      currency: data.currency,
      name: selectedPlan.name,
      description: "Subscription Payment",
      order_id: data.id,
      prefill: {
        email: user.email, // Provide user's email
        contact: user.contact, // Provide user's contact number
      },
      handler: async (response) => {
        try {
          const verifyUrl = "http://localhost:3001/api/payment/verify";
          const verificationPayload = {
            response,
            userId: user.id, // Add user ID to the payload
            username: user.name, // Add username to the payload
          };
          const { data } = await axios.post(verifyUrl, verificationPayload);
          console.log(data);
        } catch (error) {
          console.log(error);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    console.log(options)
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handlePayment = async () => {
    if (selectedPlan) {
      try {
        const orderUrl = "http://localhost:3001/api/payment/orders";
        const selectedPlanData = plans.find((plan) => plan.id === selectedPlan);
        const { data } = await axios.post(orderUrl, {
          amount: selectedPlanData.price,
        });
        console.log(data);

        const amountInPaise = data.data.amount; // Convert to number
        console.log(amountInPaise);
        if (!isNaN(amountInPaise)) {
          // Ensure the amount is a valid number
          initPayment({
            amount: amountInPaise, // Amount in paise
            currency: "INR",
            id: data.data.id,
          });

          // After successful payment, also create a new subscription
          const subscriptionApiUrl = "http://localhost:3001/api/subscription/create";
          const subscriptionData = {
            planName: selectedPlanData.name,
            createdBy: user.id,
            modifiedBy: user.id,
          };
          await axios.post(subscriptionApiUrl, subscriptionData);
        } else {
          console.log("Invalid amount received from server");
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No plan selected");
    }
  };

  
  return (
    <div className="App">
      <div className="subscription_container">
        <h2>Select a Subscription Plan</h2>
        <div className="plan_options">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`plan ${selectedPlan === plan.id ? "selected" : ""}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              <h3>{plan.name}</h3>
              <p>&#x20B9; {plan.price}</p>
            </div>
          ))}
        </div>
        <button onClick={handlePayment} className="buy_btn" disabled={!selectedPlan}>
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default Payment_page;
