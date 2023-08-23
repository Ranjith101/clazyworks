import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Replace with your backend server URL
// const BASE_URL = 'https://node-api-f0ct.onrender.com';

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/register`, userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (loginData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/login`, loginData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerVendor = async (vendorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/vendor/register`, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentVerify = async (paymentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payment/verify`, paymentData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const paymentOrders = async (vendorData) => {
  try {
    const response = await axios.post(`${BASE_URL}/api/payment/orders`, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
// Example fetchUserProfileApi function
export const fetchUserProfileApi = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/vendors/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserPaymentApi = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/api/fetchpayment/${userId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const generateUniqueVerificationToken = () => {
  const timestamp = new Date().getTime(); // Get the current timestamp
  const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string

  // Combine the timestamp and random string to create a unique token
  const verificationToken = `${timestamp}_${randomString}`;

  return verificationToken;
};

export const sendVerificationEmail = async (email) => {
  try {
    // Generate a unique verification token (you can use uuid or any method you prefer)
    const verificationToken = generateUniqueVerificationToken();

    // Make an API request to send the verification email with the token
    const response = await axios.post(`${BASE_URL}/api/send-verification-email`, {
      email,
      verificationToken,
    });

    if (response.status === 200) {
      // Email sent successfully
      return verificationToken;
    } else {
      throw new Error('Failed to send verification email');
    }
  } catch (error) {
    throw error;
  }
};

