import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  authReady: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    isAuthReady: (state, action) => {
      state.user = action.payload;
      state.authReady = true;
    },
  },
});

export const { 
  registerStart, 
  registerSuccess, 
  registerFailure,
  loginStart, 
  loginSuccess, 
  loginFailure, 
  logout,
  isAuthReady
} = userSlice.actions;

export default userSlice.reducer;
