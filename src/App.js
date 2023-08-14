import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/Login';
import Register from './components/Register';
// import VendorRegistrationPage from './components/VendorRegister';

function App() {
  return (
    <Router>
      <div className="container">
        <div className='row'>
          <div className='col-md-6'>
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/vendor-register" element={<VendorRegistrationPage />} /> */}
            </Routes>
          </div>
        </div>      
      </div>
    </Router>
  );
}

export default App;
