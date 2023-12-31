// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    setVendor: (state, action) => action.payload,
    fetchVendor: (state, action) => action.payload,
    clearUser: () => null,
  },
});

export const { setUser, clearUser, setVendor, fetchVendor } = userSlice.actions;
export default userSlice.reducer;
