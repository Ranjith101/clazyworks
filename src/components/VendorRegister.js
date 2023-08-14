// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { registerVendor } from '../api/api'; // Import your API function

// const VendorRegistrationPage = () => {
//   const userId = useSelector(selectUserId); // Get the user ID from the store

//   const [vendorData, setVendorData] = useState({
//     firstname: '',
//     lastname: '',
//     email: '',
//     mobile: '',
//     gender: '',
//     address1: '',
//     address2: '',
//     area: '',
//     city: '',
//     state: '',
//     country: '',
//     pinCode: '',
//     status: 'Active', // Default value
//   });

//   const handleVendorRegistration = async () => {
//     const vendorRegistrationData = {
//       userId,
//       ...vendorData,
//     };

//     try {
//       // Call your registerVendor API function
//       const response = await registerVendor(vendorRegistrationData);

//       console.log('Vendor registered successfully');
//     } catch (error) {
//       // Handle the error
//       console.error('Error registering vendor:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setVendorData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   return (
//     <div>
//       <h1>Vendor Registration</h1>
//       <form>
//         <input type="text" name="firstname" placeholder="First Name" onChange={handleInputChange} />
//         <input type="text" name="lastname" placeholder="Last Name" onChange={handleInputChange} />
//         <input type="email" name="email" placeholder="Email" onChange={handleInputChange} />
//         <input type="text" name="mobile" placeholder="Mobile" onChange={handleInputChange} />
//         <select name="gender" onChange={handleInputChange}>
//           <option value="">Select Gender</option>
//           <option value="Male">Male</option>
//           <option value="Female">Female</option>
//           <option value="Other">Other</option>
//         </select>
//         <input type="text" name="address1" placeholder="Address Line 1" onChange={handleInputChange} />
//         <input type="text" name="address2" placeholder="Address Line 2" onChange={handleInputChange} />
//         <input type="text" name="area" placeholder="Area" onChange={handleInputChange} />
//         <input type="text" name="city" placeholder="City" onChange={handleInputChange} />
//         <input type="text" name="state" placeholder="State" onChange={handleInputChange} />
//         <input type="text" name="country" placeholder="Country" onChange={handleInputChange} />
//         <input type="text" name="pinCode" placeholder="Pin Code" onChange={handleInputChange} />
//         <button type="button" onClick={handleVendorRegistration}>Register Vendor</button>
//       </form>
//     </div>
//   );
// };

// export default VendorRegistrationPage;
