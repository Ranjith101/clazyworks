import axios from "axios";
import { useState } from "react";
import "../../App.css";

const Payment_page = () => {
  const [book, setBook] = useState({
    name: "The Fault In Our Stars",
    author: "John Green",
    img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
    price: 500,
  });

  // Replace with actual user information
  const user = {
    id: 21, // Example user ID
    name: "Ranjith", // Example user name
    // ... other user properties
  };

  const initPayment = async (data) => {
	console.log(data,"data")
    const options = {
      key: "rzp_test_0exqW8wtRx0cbB",
      amount: data.amount,
      currency: data.currency,
      name: book.name,
      description: "Test Transaction",
      image: book.img,
      order_id: data.id,
      prefill: {
        email: user.email, // Provide user's email
        contact: user.contact, // Provide user's contact number
      },
      handler: async (response) => {
		console.log(response)
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
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

//   const handlePayment = async () => {
//     try {
//       const orderUrl = "http://localhost:3001/api/payment/orders";
//       const { data } = await axios.post(orderUrl, { amount: book.price });
//       console.log(data);
//       initPayment({
//         amount: data.data.amount, // Convert to paise (currency subunit)
//         currency: "INR", // Replace with your preferred currency
//         id: data.data.id,
//       });
// 	  console.log(data.data.amount)
//     } catch (error) {
//       console.log(error);
//     }
//   };

const handlePayment = async () => {
	try {
	  const orderUrl = "http://localhost:3001/api/payment/orders";
	  const { data } = await axios.post(orderUrl, { amount: book.price });
	  console.log(data);
  
	  const amountInPaise = parseFloat(data.data.amount); // Convert to number
	  if (!isNaN(amountInPaise)) {
		// Ensure the amount is a valid number
		initPayment({
		  amount: amountInPaise, // Amount in paise
		  currency: "INR",
		  id: data.data.id,
		});
		console.log(amountInPaise);
	  } else {
		console.log("Invalid amount received from server");
	  }
	} catch (error) {
	  console.log(error);
	}
  };
  
  return (
    <div className="App">
      <div className="book_container">
        <img src={book.img} alt="book_img" className="book_img" />
        <p className="book_name">{book.name}</p>
        <p className="book_author">By {book.author}</p>
        <p className="book_price">
          Price : <span>&#x20B9; {book.price}</span>
        </p>
        <button onClick={handlePayment} className="buy_btn">
          buy now
        </button>
      </div>
    </div>
  );
};

export default Payment_page;
