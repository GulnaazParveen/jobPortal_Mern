import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for authentication
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, // Initialize from localStorage
  token: localStorage.getItem("authToken") || null, // Initialize from localStorage
  loading: false,
  error: null,
};

// Slice with reducers
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.loading = false;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;

// Asynchronous login action using thunk
export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch(loginStart());

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/login",
      loginData,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // Log the entire response to verify the structure
    console.log("user log in successfully", response.data);

    // Correcting the access to the accessToken and user
    const token = response.data.data.accessToken; // Fix: Access nested data
    const user = response.data.data.user; // Fix: Access nested data

    // Logging to verify the values are correct
    console.log("getting token", token); // Should log the correct accessToken
    console.log("getting user", user); // Should log the user object

    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch the success action
    dispatch(loginSuccess({ token, user }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};


export const logoutUser = () => (dispatch) => {
  // Clear localStorage
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");

  dispatch(logout());
};

export default authSlice.reducer;
