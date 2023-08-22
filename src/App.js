import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import VendorRegistrationPage from './components/VendorRegister';
import SubscriptionPage from './components/razorpay/Payment';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/payment" element={<SubscriptionPage />} />
        <Route path="/vendor-register" element={<VendorRegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;