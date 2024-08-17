// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/Features'
import EmployerSlice from '../features/EmployerSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    employer:EmployerSlice
  },
});

export default store;
