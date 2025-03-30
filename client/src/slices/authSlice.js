import { createSlice } from "@reduxjs/toolkit";

const loadInitialState = () => {
  try {
    const storedAuth = localStorage.getItem("auth");
    if (storedAuth) {
      return JSON.parse(storedAuth);
    }
  } catch (err) {
    console.error("Failed to parse stored auth state", err);
  }
  return {
    userInfo: null,
    userToken: null,
    isAuthenticated: false,
    rememberMe: false,
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: loadInitialState(),
  reducers: {
    setCredentials: (state, action) => {
      const { user, token, rememberMe } = action.payload;
      state.userInfo = user;
      state.userToken = token;
      state.isAuthenticated = true;
      state.rememberMe = rememberMe || false;

      // Save to localStorage if rememberMe is true
      if (rememberMe) {
        localStorage.setItem("auth", JSON.stringify(state));
      } else {
        localStorage.removeItem("auth");
      }
    },
    logout: (state) => {
      state.userInfo = null;
      state.userToken = null;
      state.isAuthenticated = false;
      state.rememberMe = false;
      localStorage.removeItem("auth");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
