// // import { createSlice } from '@reduxjs/toolkit';
// // import { createSelector } from 'reselect';

// // const userSlice = createSlice({
// //   // ... your existing code

// //   reducers: {
// //     // ... your existing reducers

// //     setUserLogin: (state, action) => {
// //       state.userData = action.payload;
// //       state.isLoggedIn = true;
// //     },

// //     // ... other reducers
// //   },
// // });

// // export const { setUserLogin } = userSlice.actions;

// // // ... rest of the file




// // // Select the user data from the state
// // export const selectUserData = (state) => state.user.userData;

// // // Create a selector that returns the user's full name
// // export const selectUserFullName = createSelector(
// //   [selectUserData],
// //   (userData) => `${userData.firstname} ${userData.lastname}`
// // );

// // // Create a selector that returns the user's ID and full name



// import { createSlice } from '@reduxjs/toolkit';

// const userSlice = createSlice({
//   name: 'user', // Provide a unique name for your slice
//   initialState: {
//     isLoggedIn: false,
//     userData: null,
//   },
//   reducers: {
//     setUserLogin: (state, action) => {
//       state.userData = action.payload.userData;
//       state.id = action.payload.id;
//       state.isLoggedIn = true;
//     },
//     // ... other reducers
//   },
// });

// export const { setUserLogin } = userSlice.actions;


// export const selectUserData = (state) => state.user.userData;
// export const selectUserId = (state) => state.user.id;

// export default userSlice.reducer;
