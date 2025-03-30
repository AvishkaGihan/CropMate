import { useState } from "react";
import { useParams, useNavigate } from "react-router";
import { useResetPasswordMutation } from "../../slices/authApi";
import { FormInput } from "../../components/Shared/FormInput";
import { AuthLayout } from "./AuthLayout";
import { Leaf } from "lucide-react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { formAnimation } from "../../util/animations";
import FarmImage from "../../assets/images/farm-landscape.jpg";

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const { resetToken } = useParams();
  const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    try {
      await resetPassword({
        resetToken,
        password: formData.password,
      }).unwrap();
      setTimeout(() => navigate("/sign-in"), 3000);
    } catch (err) {
      setErrorMessage(
        err.data?.message || "Password reset failed. Please try again."
      );
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Create a new password for your account"
      image={FarmImage}
    >
      <div className="text-center mb-8">
        <Link to="/" className="inline-block mb-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Leaf
              size={28}
              className="text-mindaro-400 group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-cambridge-blue-800 mb-1">
          Reset Password
        </h1>
        <p className="text-sm text-cambridge-blue-600">
          Please enter your new password
        </p>
      </div>

      <motion.div variants={formAnimation} initial="hidden" animate="visible">
        {isSuccess ? (
          <div className="text-center p-4 bg-mindaro-50 rounded-lg border border-mindaro-200">
            <p className="text-cambridge-blue-700">
              Password reset successful! Redirecting to login...
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              type="password"
              label="New Password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Enter new password"
              required={true}
            />

            <FormInput
              type="password"
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="Confirm new password"
              required={true}
            />

            {errorMessage && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 bg-golden-brown-600 text-white rounded-lg hover:bg-golden-brown-700 focus:ring-2 focus:ring-golden-brown-300 transition-all disabled:opacity-70"
            >
              {isLoading ? "Resetting Password..." : "Reset Password"}
            </button>

            <div className="text-center">
              <Link
                to="/sign-in"
                className="text-sm text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        )}
      </motion.div>
    </AuthLayout>
  );
};

export default ResetPassword;
