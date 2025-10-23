// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { getRole, getToken } from "../utils/auth";

const ProtectedRoute = ({ allowedRole }) => {
  const token = getToken();
  const role = getRole();
  if (!token) return <Navigate to="/login" replace />;
  if (allowedRole && role !== allowedRole) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default ProtectedRoute;