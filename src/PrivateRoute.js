// src/PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token"); // Or any auth check logic

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
