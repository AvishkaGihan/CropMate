import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { CheckCircle2, Eye, EyeOff, Leaf } from 'lucide-react';
import { BENEFITS } from '../../constants';
import { formAnimation } from '../../util/animations';
import FarmImage from '../../assets/images/farm-landscape.jpg';

const SignIn = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would make an API call to your backend for authentication
            console.log("Login submitted:", formData);

            // Simulate API call delay
            setTimeout(() => {
                // After successful login, navigate to dashboard
                navigate('/dashboard');
            }, 1500);

        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Image - Fixed position */}
            <div className="hidden md:block md:w-1/2 bg-cambridge-blue-700 fixed left-0 top-0 bottom-0">
                <img
                    src={FarmImage}
                    alt="Farm landscape"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cambridge-blue-900/90 to-cambridge-blue-700/50"></div>

                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center">
                        <div className="mb-6">
                            <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
                                <Leaf size={40} className="text-mindaro-400" />
                            </div>
                            <h2 className="text-3xl font-bold mb-3">Welcome Back!</h2>
                            <p className="text-white/80 text-lg">Sign in to access your CropMate account</p>
                        </div>

                        <div className="mt-8">
                            <div className="flex items-center justify-center mb-4">
                                <div className="h-px bg-white/20 flex-1"></div>
                                <span className="px-4 text-white/60 text-sm">BENEFITS</span>
                                <div className="h-px bg-white/20 flex-1"></div>
                            </div>

                            <ul className="space-y-4 text-left">
                                {BENEFITS.map((benefit, index) => (
                                    <li
                                        key={index}
                                        className="flex items-start"
                                    >
                                        <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                                            <CheckCircle2 size={16} className="text-mindaro-400" />
                                        </div>
                                        <span className="text-white/90">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Form - Wider layout */}
            <div className="w-full md:ml-[50%] md:w-1/2 bg-cambridge-blue-50 min-h-screen flex items-center justify-center p-6 overflow-y-auto">
                {/* Form - Increased max width */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={formAnimation}
                    className="max-w-md w-full rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white my-6 transition-all duration-300 ease-out"
                >
                    {/* Logo & Title */}
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-block mb-4">
                            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="text-mindaro-400 transition-transform duration-500 group-hover:rotate-12">
                                    <Leaf size={28} className="text-mindaro-400" />
                                </div>
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-cambridge-blue-800 mb-1">Welcome Back</h1>
                        <p className="text-sm text-cambridge-blue-600">Sign in to your CropMate account</p>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        {/* Email */}
                        <div>
                            <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        {/* Password */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block text-cambridge-blue-800 text-sm font-medium" htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cambridge-blue-500 hover:text-golden-brown-500"
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember me */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="rememberMe"
                                    name="rememberMe"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={() => setRememberMe(prev => !prev)}
                                    className="w-4 h-4 text-golden-brown-600 bg-white border-cambridge-blue-300 rounded focus:ring-golden-brown-300"
                                />
                                <label htmlFor="rememberMe" className="ml-2 text-sm text-cambridge-blue-700">
                                    Remember me
                                </label>
                            </div>
                            <Link to="/forgot-password" className="text-xs text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline transition-colors">
                                Forgot Password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <div>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                                        Signing in...
                                    </>
                                ) : (
                                    'Sign In'
                                )}
                            </button>
                        </div>
                    </form>
                    {/* Sign Up Link */}
                    <div className="mt-6 text-center text-sm">
                        <p className="text-cambridge-blue-700">
                            Don't have an account?{" "}
                            <Link
                                to={"/signup"}
                                className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline transition-colors"
                            >
                                {"Sign Up"}
                            </Link>
                        </p>

                        <div className="mt-4 text-xs text-cambridge-blue-600 text-center">
                            <span>By signing in, you acknowledge our </span>
                            <Link to="/terms" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">
                                Terms of Service
                            </Link>
                            <span> and </span>
                            <Link to="/privacy" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">
                                Privacy Policy
                            </Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}

export default SignIn;