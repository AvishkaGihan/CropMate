import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { FormInput } from "../../components/Shared/FormInput";
import FarmImage from "../../assets/farm-landscape.jpg";

const SignIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/dashboard");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome Back!"
      subtitle="Sign in to access your CropMate account"
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
          Welcome Back
        </h1>
        <p className="text-sm text-cambridge-blue-600">
          Sign in to your CropMate account
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <FormInput
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <FormInput
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              type="checkbox"
              checked={rememberMe}
              onChange={() => setRememberMe((prev) => !prev)}
              className="w-4 h-4 text-golden-brown-600 bg-white border-cambridge-blue-300 rounded focus:ring-golden-brown-300"
            />
            <label
              htmlFor="rememberMe"
              className="ml-2 text-sm text-cambridge-blue-700"
            >
              Remember me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className="text-xs text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline"
          >
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      <div className="mt-6 text-center text-sm">
        <p className="text-cambridge-blue-700">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
