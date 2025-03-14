// src/components/Navbar.jsx
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="bg-green-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-xl font-bold">
          CropMate
        </Link>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search crops..."
            className="px-4 py-2 rounded-lg focus:outline-none"
          />
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-white">
                Login
              </Link>
              <Link to="/register" className="text-white">
                Register
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="text-white">
                Dashboard
              </Link>
              <button onClick={handleLogout} className="text-white">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
