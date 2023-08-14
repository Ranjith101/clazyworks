// import './App.css';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import LoginPage from './components/Login';
// import Register from './components/Register';
// import VendorRegistrationPage from './components/VendorRegister';
// import PaymentForm from './components/stripe/PaymentForm';

// function App() {
//   return (
//     <Router>
//       <div className="container">
//         <div className='row'>
//           <div className='col-md-6'>
//             <Routes>
//               <Route path="/" element={<LoginPage />} />
//               <Route path="/register" element={<Register />} />
//               {/* <Route path="/vendor-register" element={<VendorRegistrationPage />} /> */}
//             </Routes>
//           </div>
//         </div>      
//       </div>
//     </Router>
//     // <div>
//     //   <VendorRegistrationPage />
//     // </div>
//   );
// }

// export default App;


import axios from "axios";
import { useState } from "react";
import "./App.css";

function App() {
	const [book, setBook] = useState({
		name: "The Fault In Our Stars",
		author: "John Green",
		img: "https://images-na.ssl-images-amazon.com/images/I/817tHNcyAgL.jpg",
		price: 500,
	});

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_0exqW8wtRx0cbB",
			amount: data.amount,
			currency: data.currency,
			name: book.name,
			description: "Test Transaction",
			image: book.img,
			order_id: data.id,
			handler: async (response) => {
				try {
					const verifyUrl = "http://localhost:3001/api/payment/verify";
					const { data } = await axios.post(verifyUrl, response);
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

	const handlePayment = async () => {
		try {
			const orderUrl = "http://localhost:3001/api/payment/orders";
			const { data } = await axios.post(orderUrl, { amount: book.price });
			console.log(data);
			initPayment(data.data);
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
}

export default App;