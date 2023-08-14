import axios from 'axios';

const BASE_URL = 'http://localhost:3001'; // Replace with your backend server URL

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
    const response = await axios.post(`${BASE_URL}/api/register-vendor`, vendorData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
