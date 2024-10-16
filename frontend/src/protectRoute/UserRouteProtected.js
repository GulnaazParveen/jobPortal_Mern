import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const UserRouteProtected = () => {
   const user = JSON.parse(localStorage.getItem("user"));

   // If the user is not logged in or not a regular user, redirect to home
   if (!user || user.role !== "user") {
     return <Navigate to="/" />;
   }

   return <Outlet />;
}

export default UserRouteProtected

