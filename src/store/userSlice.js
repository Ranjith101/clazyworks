// userSlice.js
import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userId: null,
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export const { loginSuccess } = userSlice.actions;

export default userSlice.reducer;
