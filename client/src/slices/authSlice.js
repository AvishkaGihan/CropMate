import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload.user;
      state.userToken = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
