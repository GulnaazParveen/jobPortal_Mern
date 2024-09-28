// src/redux/store.js

// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/Features'


// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   
//   },
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import EmployerSlice from '../features/EmployerSlice';
import authReducer from "../features/authSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Add the auth reducer to the store
    employer: EmployerSlice,
  },
});

export default store;
