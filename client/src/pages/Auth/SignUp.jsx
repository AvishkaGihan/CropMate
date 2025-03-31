import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Leaf } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { FormInput } from "../../components/Shared/FormInput";
import { roles, roleCardClasses } from "../../constants";
import { expandCollapse } from "../../util/animations";
import FarmImage from "../../assets/farm-landscape.jpg";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "farmer",
    bankDetails: {
      accountName: "",
      accountNumber: "",
      bankName: "",
      branch: "",
    },
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      navigate("/sign-in");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Join CropMate Today"
      subtitle="Create your account and start connecting with the agricultural ecosystem"
      image={FarmImage}
    >
      <div className="text-center mb-6">
        <Link to="/" className="inline-block mb-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <Leaf
              size={28}
              className="text-mindaro-400 group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
        </Link>
        <h1 className="text-2xl font-bold text-cambridge-blue-800 mb-1">
          Welcome To CropMate
        </h1>
        <p className="text-sm text-cambridge-blue-600">
          Create an account to join with CropMate
        </p>
      </div>

      <div className="mb-5">
        <label className="block text-cambridge-blue-700 text-sm text-center font-medium mb-2">
          I am a
        </label>
        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
          {roles.map((role) => (
            <div
              key={role.id}
              onClick={() =>
                setFormData((prev) => ({ ...prev, role: role.id }))
              }
              className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${role.id === formData.role
                  ? roleCardClasses[role.id].selected
                  : roleCardClasses[role.id].default
                }`}
            >
              <div
                className={`w-10 h-10 rounded-full ${role.id === formData.role
                    ? roleCardClasses[role.id].iconBg.selected
                    : roleCardClasses[role.id].iconBg.default
                  } flex items-center justify-center mb-2`}
              >
                {roleCardClasses[role.id].icon}
              </div>
              <span
                className={`${roleCardClasses[role.id].text
                  } font-medium text-sm`}
              >
                {role.id}
              </span>
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          <FormInput
            type="email"
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            type="tel"
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter phone"
          />
          <FormInput
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FormInput
            type="password"
            label="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password"
          />
          <FormInput
            type="password"
            label="Confirm Password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />
        </div>

        <AnimatePresence>
          {formData.role !== "vendor" && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={expandCollapse}
              className="overflow-hidden"
            >
              <div className="pt-1 pb-3">
                <h3 className="text-sm font-medium text-cambridge-blue-800 border-b border-cambridge-blue-100 pb-2 mb-3">
                  Bank Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <FormInput
                    label="Account Holder Name"
                    name="bankDetails.accountName"
                    value={formData.bankDetails.accountName}
                    onChange={handleChange}
                    placeholder="Account holder name"
                    required={formData.role !== "vendor"}
                  />
                  <FormInput
                    label="Account Number"
                    name="bankDetails.accountNumber"
                    value={formData.bankDetails.accountNumber}
                    onChange={handleChange}
                    placeholder="Account number"
                    required={formData.role !== "vendor"}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormInput
                    label="Bank Name"
                    name="bankDetails.bankName"
                    value={formData.bankDetails.bankName}
                    onChange={handleChange}
                    placeholder="Bank name"
                    required={formData.role !== "vendor"}
                  />
                  <FormInput
                    label="Branch"
                    name="bankDetails.branch"
                    value={formData.bankDetails.branch}
                    onChange={handleChange}
                    placeholder="Branch name"
                    required={formData.role !== "vendor"}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full" />
              Creating Account...
            </>
          ) : (
            "Create Account"
          )}
        </button>

        <div className="mt-6 text-center text-sm">
          <p className="text-cambridge-blue-700">
            Already have an account?{" "}
            <Link
              to="/sign-in"
              className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default SignUp;
