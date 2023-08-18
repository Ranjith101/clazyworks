// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { setUser,setVendor } from "./userSlice";

const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const vendorFromLocalStorage = JSON.parse(localStorage.getItem('registeredVendor'));

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
if (userFromLocalStorage) {
  store.dispatch(setUser(userFromLocalStorage));
}

if (vendorFromLocalStorage) {
  store.dispatch(setVendor(vendorFromLocalStorage));
}

export default store;
