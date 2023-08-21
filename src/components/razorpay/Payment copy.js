import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { fetchUserPaymentApi } from "../../api/api";
import ProductsPage from "../Products";

const SubscriptionPage = () => {
  const vendor_details = useSelector((state) => state.user)
  console.log(vendor_details, "from_redux")
  const plans = [
    { id: "Silver Plan", name: "Silver Plan", price: 299 },
    { id: "Gold Plan", name: "Gold Plan", price: 499 },
    { id: "Platinum Plan", name: "Platinum Plan", price: 799 },
  ];

  const [paymentInfo, setPaymentInfo] = useState(null);

  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));

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
            name: user.name,
            email: user.email, // Add user's email
            contact: user.contact, // Add user's contact number
          },
          handler: async (response) => {
            response.amount = plan.price;
            console.log(response);
            // After successful payment, verify and store payment details
            try {
              const verifyUrl = "http://localhost:3001/api/payment/verify";
              const verifyResponse = await axios.post(verifyUrl, {
                response,
                userId: user.id,
                username: user.name,
                payment_amount: plan.price,
              });

              if (verifyResponse.data.message === "Payment verified and details stored") {
                alert("Payment verified and details stored");

                // After successful payment and verification, create a new subscription
                function generateSubscriptionId(userId, startDate, planName) {
                  const randomValue = Math.random().toString(36).substr(2, 8);
                  return `${userId}-${startDate}-${planName}-${randomValue}`;
                }
                try {
                  const v_subscriptionApiUrl = "http://localhost:3001/api/newvendorsubscription/create";
                  const v_subscriptionData = {
                    vendorId: user.id,
                    subscriptionId: generateSubscriptionId(user.id, new Date(), plan.name), // You can modify this as needed
                    planName: plan.name,
                    price: plan.price,
                    startDate: new Date(), // Modify as needed
                    endDate: new Date(),   // Modify as needed
                    status: "Active",      // Modify as needed
                  }
                  const v_subscriptionResponse = await axios.post(v_subscriptionApiUrl, v_subscriptionData);
                  console.log(v_subscriptionResponse);
                } catch (error) {
                  console.log(error);
                }

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

  const userId = user.id;
  useEffect(() => {


    const fetchPaymentInfo = async () => {
      try {
        const paymentData = await fetchUserPaymentApi(userId);
        console.log(paymentData)
        setPaymentInfo(paymentData);
      } catch (error) {
        console.error('Error fetching payment information:', error);
      }
    };

    fetchPaymentInfo();
  }, [userId]);
  return (
    <div className="App">

      {paymentInfo ? (
        <p>
          <ProductsPage />
        </p>
      ) : (
        <>
          <div className="subscription_plans">
            <h2>Choose a Subscription Plan</h2>
            {plans.map((plan) => (
              <div key={plan.id} className="subscription_plan">
                <h3>{plan.name}</h3>
                <p>&#x20B9; {plan.price}</p>
                <button onClick={() => handlePayment(plan.id)}>Select Plan</button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SubscriptionPage;
