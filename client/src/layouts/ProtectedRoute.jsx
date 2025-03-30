import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = ({ roles = [] }) => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  // Check if user has required role
  if (roles.length > 0 && !roles.includes(userInfo.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
