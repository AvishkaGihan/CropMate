import { useState } from "react";
import { useForgotPasswordMutation } from "../../slices/authApi";
import { FormInput } from "../../components/Shared/FormInput";
import { Link } from "react-router";
import { Leaf } from "lucide-react";
import { motion } from "framer-motion";
import { formAnimation } from "../../util/animations";
import { AuthLayout } from "./AuthLayout";
import FarmImage from "../../assets/images/farm-landscape.jpg";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [forgotPassword, { isLoading, isSuccess }] =
    useForgotPasswordMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      await forgotPassword(email).unwrap();
    } catch (err) {
      const message =
        err.data?.message || "Password reset failed. Please try again.";
      setErrorMessage(message);
      console.error(err);
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Reset your CropMate account password"
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
          Forgot Password?
        </h1>
        <p className="text-sm text-cambridge-blue-600">
          Don't worry, we'll help you reset it
        </p>
      </div>

      <motion.div variants={formAnimation} initial="hidden" animate="visible">
        {isSuccess ? (
          <div className="text-center p-4 bg-mindaro-50 rounded-lg border border-mindaro-200">
            <p className="text-cambridge-blue-700">
              An email has been sent to{" "}
              <span className="font-medium">{email}</span> with instructions to
              reset your password.
            </p>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-6">
            <FormInput
              type="email"
              label="Email Address"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
              {isLoading ? "Sending Reset Link..." : "Reset Password"}
            </button>

            <div className="text-center">
              <Link
                to="/signin"
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

export default ForgotPassword;
