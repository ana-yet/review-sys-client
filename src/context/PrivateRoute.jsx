import React from "react";
import useAuth from "../hook/useAuth";
import { Navigate, useLocation } from "react-router";
import LoadingSpinner from "../pages/LoadingSpinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return <LoadingSpinner />;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location?.pathname }} replace />
  );
};

export default PrivateRoute;
