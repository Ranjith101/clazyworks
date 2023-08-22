import React, { useState, useEffect } from 'react';
import { registerVendor } from '../api/api'; // Import your API function
import { Form, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setVendor } from '../store/userSlice';
import { fetchUserProfileApi } from '../api/api';
import SubscriptionPage from './razorpay/Payment';

const VendorRegistrationPage = () => {
    const dispatch = useDispatch();
    // const user = useSelector((state)=>state.user)
    // console.log("from redux",user)
    const navigate = useNavigate();
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
 
    const userId = userFromLocalStorage.id; // Get the user ID from the store

  const [isVendorRegistered, setIsVendorRegistered] = useState(false);  
  
  const [vendorData, setVendorData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    mobile: '',
    gender: '',
    address1: '',
    address2: '',
    area: '',
    city: '',
    state: '',
    country: '',
    pinCode: '',
    status: 'Active', // Default value
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await fetchUserProfileApi(userId);
        // console.log(userProfile)
        setIsVendorRegistered(userProfile); // Assuming the API response has an 'isVendor' field
        
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleVendorRegistration = async () => {
    const vendorRegistrationData = {
      userId,
      ...vendorData,
    };

    
    try {
      // Call your registerVendor API function
      const response = await registerVendor(vendorRegistrationData);
      // console.log('Vendor registered successfully', response.vendor);
      dispatch(setVendor(response.vendor))
      localStorage.setItem('registeredVendor', JSON.stringify(response.vendor));
      navigate('/payment')
      
    } catch (error) {
      // Handle the error
      console.error('Error registering vendor:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
  <>   
    
      {isVendorRegistered ? (
        <>
        {/* <p>User is registered as a vendor.</p>
        <p>if payment pending <Link to='/payment'>payment page</Link></p> */}
        <SubscriptionPage />
        </>
      ) : (
        <>
    <Container>  
    <h1>Vendor Registration</h1>
    <Form>
      <Form.Control type="text" name="firstname" placeholder="First Name" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="lastname" placeholder="Last Name" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="email" name="email" placeholder="Email" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="mobile" placeholder="Mobile" className='mb-3' onChange={handleInputChange} />
      <Form.Control as="select" name="gender" className='mb-3' onChange={handleInputChange}>
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </Form.Control>
      <Form.Control type="text" name="address1" placeholder="Address Line 1" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="address2" placeholder="Address Line 2" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="area" placeholder="Area" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="city" placeholder="City" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="state" placeholder="State" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="country" placeholder="Country" className='mb-3' onChange={handleInputChange} />
      <Form.Control type="text" name="pinCode" placeholder="Pin Code" className='mb-3' onChange={handleInputChange} />
      <Button variant="primary" onClick={handleVendorRegistration}>
        Register Vendor
      </Button>
    </Form>
    </Container>
    </>
    )}
  </> 
  );
};

export default VendorRegistrationPage;
