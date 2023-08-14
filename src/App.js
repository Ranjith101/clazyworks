import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
// import VendorRegistrationPage from './components/VendorRegister';
import Payment_page from './components/razorpay/Payment';

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
              {/* <Route path="/vendor-register" element={<VendorRegistrationPage />} /> */}
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