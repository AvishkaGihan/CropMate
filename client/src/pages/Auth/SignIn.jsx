import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Leaf } from "lucide-react";
import { useLoginMutation } from "../../slices/authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../slices/authSlice";

import { AuthLayout } from "./AuthLayout";
import { FormInput } from "../../components/Shared/FormInput";
import FarmImage from "../../assets/images/farm-landscape.jpg";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, rememberMe } = formData;

  const onChange = (e) => {
    console.log("Input Name:", e.target.name);
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await login({ email, password, rememberMe }).unwrap();
      dispatch(
        setCredentials({
          user: response,
          token: response.token,
          rememberMe: true,
        })
      );
      navigate("/");
    } catch (err) {
      const message =
        err.data?.message || "Registration failed. Please try again.";
      setErrorMessage(message);
      console.error(err);
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

      <form onSubmit={onSubmit} className="space-y-5">
        <FormInput
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Enter your email"
          required={true}
        />

        <FormInput
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={onChange}
          placeholder="Enter your password"
          required={true}
        />

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={onChange}
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
        {errorMessage && (
          <div className="p-3 m-4 text-sm text-red-800 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          {isLoading ? (
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
