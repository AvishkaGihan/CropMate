// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Redirect to Login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render the requested route if authenticated
  return children;
};

export default ProtectedRoute;
