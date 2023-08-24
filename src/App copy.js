import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
import VendorRegistrationPage from './components/VendorRegister';
import SubscriptionPage from './components/razorpay/Payment';

import EmailVerificationPage from './components/EmailVerification';
import Dashboard from './components/dashboard/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<EmailVerificationPage/>} />
        <Route path="/payment" element={<SubscriptionPage />} />
        <Route path="/vendor-register" element={<VendorRegistrationPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* <Route path="/pie-chart" element={<PieChart />} />
        <Route path="/bar-chart" element={<Barchart />} /> */}
      </Routes>
    </Router>
  );
}

export default App;