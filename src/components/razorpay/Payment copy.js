import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchUserPaymentApi } from "../../api/api";
import '../../styles/plans.css'
import { Button } from "react-bootstrap";
import Dashboard from "../dashboard/Dashboard";

const SubscriptionPage = () => {
  const plans = [
    { id: "Silver Plan", name: "Silver Plan", price: 299 },
    { id: "Gold Plan", name: "Gold Plan", price: 499 },
    { id: "Platinum Plan", name: "Platinum Plan", price: 799 },
  ];

  const [paymentInfo, setPaymentInfo] = useState(null);

  const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
  const user = {
    id: userFromLocalStorage.id,
    name: userFromLocalStorage.firstname,
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
            email: user.email,
            contact: user.contact,
          },
          handler: async (response) => {
            response.amount = plan.price;
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

                function generateSubscriptionId(userId, startDate, planName) {
                  const randomValue = Math.random().toString(36).substr(2, 8);
                  return `${userId}-${startDate}-${planName}-${randomValue}`;
                }

                try {
                  const v_subscriptionApiUrl = "http://localhost:3001/api/newvendorsubscription/create";
                  const v_subscriptionData = {
                    vendorId: user.id,
                    subscriptionId: generateSubscriptionId(user.id, new Date(), plan.name),
                    planName: plan.name,
                    price: plan.price,
                    startDate: new Date(),
                    endDate: new Date(),
                    status: "Active",
                  }
                  const v_subscriptionResponse = await axios.post(v_subscriptionApiUrl, v_subscriptionData);
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
        setPaymentInfo(paymentData);
      } catch (error) {
        console.error('Error fetching payment information:', error);
      }
    };

    fetchPaymentInfo();
  }, [userId]);

  const navigate = useNavigate();

  useEffect(() => {
    if (paymentInfo) {
      navigate('/dashboard');
    }
  }, [paymentInfo, navigate]);

  return (
    <div className="App">
      {/* {paymentInfo ? (
        <p style={{ marginLeft: "-26%" }}>
          <Dashboard />
        </p>
      ) : ( */}
        <>
          {plans.map((plan) => {
            return (
              <div>
                <div className="product-block" id="zplan1">
                  <span className="plan-name">{plan.name}</span>
                  <span className="price zpricegroup zpricegroup1 zdisplay zpricegroup4" id="zplan-Standard" data-price="20;18;18;1300;20;16;2400;26;30;73;73;324;270;5400;1440;324;25;276000//14;12;9;800;14;12;1680;17;20;51;51;216;180;3600;960;216;19;193200" data-nosnippet="true">
                    <span className="zcurrency-symbol" style={{ textTransform: "uppercase" }}>₹</span>
                    <span className="z-price-text">{plan.price}</span>
                  </span>
                  <span className="detail">
                    <span className="">
                      <span className="ztogglegroup ztogglegroup1" data-toggleval="/user/month billed monthly;/user/month billed annually">/user/month billed annually</span>
                    </span>
                  </span>
                  <Button className="access-btn" onClick={() => handlePayment(plan.id)}>Buy Now</Button>
                  <p className="plan-desc">Automate and optimize your sales cycle</p>
                </div>
              </div>
            )
          })}
        </>
      {/* )} */}
    </div>
  );
};

export default SubscriptionPage;
