import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials=true
// Initial state for authentication
const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null, 
  token: localStorage.getItem("authToken") || null, 
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
      `${ API_URL}/api/v1/users/login`,
      loginData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );
    // Log the entire response to verify the structure
    // console.log("user log in successfully", response.data);

    // Correcting the access to the accessToken and user
    const token = response.data.data.accessToken; 
    const user = response.data.data.user; 


    // Store token and user in localStorage
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));

    // Dispatch the success action
    dispatch(loginSuccess({ token, user }));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || "Login failed"));
  }
};


  export const logoutUser = () => async (dispatch) => {
    try {
      // Make the request to log out the user on the backend
      const response = await axios.post(`${ API_URL}/api/v1/users/logout`, {},{ withCredentials: true });

      console.log("Logout user successfully:", response);

      // Clear localStorage
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");

      // Dispatch the logout action
      dispatch(logout());

    } catch (error) {
      console.error("Error logging out:", error);     
    }
  };



export default authSlice.reducer;
