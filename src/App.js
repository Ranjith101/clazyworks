import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import VendorRegistrationPage from './components/VendorRegister';
import Products from './components/Products';
import SubscriptionPage from './components/razorpay/Payment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<SubscriptionPage />} />
        <Route path="/vendor-register" element={<VendorRegistrationPage />} />
        <Route path="/products" element={<Products />} />
      </Routes>
    </Router>
  );
}

export default App;