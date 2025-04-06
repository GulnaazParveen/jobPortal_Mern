import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const UserRouteProtected = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("User data:", user);

  // Redirect to home if the user is not found in localStorage
  if (!user) {
    console.log("Redirecting to home as user is not logged in.");
    return <Navigate to="/" />;
  }

  return <Outlet />;
}


export default UserRouteProtected

