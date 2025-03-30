import { useState, memo } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Eye, EyeOff, Leaf, Store, Truck } from 'lucide-react';
import { formAnimation, bankDetailsAnimation } from '../../util/animations';
import { BENEFITS, roleCardClasses, ROLES } from '../../constants';
import FarmImage from '../../assets/images/farm-landscape.jpg'

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: '',
        address: '',
        role: 'farmer', // Default role
        bankDetails: {
            accountName: '',
            accountNumber: '',
            bankName: '',
            branch: ''
        }
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            // Handle nested bankDetails fields
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Here you would make an API call to your backend
            console.log("Form data submitted:", formData);

            // After successful submission, navigate to login
            setTimeout(() => {
                navigate('/sign-in');
            }, 1500);

        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setIsSubmitting(false);
        }
    };



    return (
        <div className="min-h-screen flex">
            {/* Left Column - Image - Fixed position */}
            <div className="hidden md:block md:w-2/5 bg-cambridge-blue-700 fixed left-0 top-0 bottom-0">
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
                            <h2 className="text-3xl font-bold mb-3">Join CropMate Today</h2>
                            <p className="text-white/80 text-lg">Create your account and start connecting with the agricultural ecosystem</p>
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
            <div className="w-full md:ml-[40%] md:w-3/5 bg-cambridge-blue-50 min-h-screen flex items-center justify-center p-6 overflow-y-auto">
                {/* Form - Increased max width */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={formAnimation}
                    className="max-w-2xl w-full rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white my-6 transition-all duration-300 ease-out"
                >
                    {/* Logo & Title */}
                    <div className="text-center mb-6">
                        <Link to="/" className="inline-block mb-4">
                            <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="text-mindaro-400 transition-transform duration-500 group-hover:rotate-12">
                                    <Leaf size={28} className="text-mindaro-400" />
                                </div>
                            </div>
                        </Link>
                        <h1 className="text-2xl font-bold text-cambridge-blue-800 mb-1">Welcome To CropMate</h1>
                        <p className="text-sm text-cambridge-blue-600">Create an account to join with CropMate</p>
                    </div>

                    {/* Role Select */}
                    <div className="mb-5">
                        <label className="block text-cambridge-blue-700 text-sm text-center font-medium mb-2">
                            I am a
                        </label>
                        <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
                            {ROLES.map(role => (
                                <div
                                    key={role.id}
                                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                                    className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${role.id === formData.role ? roleCardClasses[role.id].selected : roleCardClasses[role.id].default
                                        }`}
                                >
                                    <div className={`w-10 h-10 rounded-full ${role.id === formData.role ? roleCardClasses[role.id].iconBg.selected : roleCardClasses[role.id].iconBg.default
                                        } flex items-center justify-center mb-2`}>
                                        {roleCardClasses[role.id].icon}
                                    </div>
                                    <span className={`${roleCardClasses[role.id].text} font-medium text-sm`}>{role.id}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4"
                    >
                        {/* Two Column Layout for Basic Information - First Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Name */}
                            <div>
                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="name">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                    placeholder="Enter your name"
                                    required
                                />
                            </div>

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
                        </div>

                        {/* Second Row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Phone */}
                            <div>
                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="phone">
                                    Phone Number
                                </label>
                                <input
                                    id="phone"
                                    name="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                    placeholder="Enter phone"
                                    required
                                />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="address">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                    placeholder="Enter address"
                                    required
                                />
                            </div>
                        </div>

                        {/* Third Row - Password Fields */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Password */}
                            <div>
                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="password">
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                        placeholder="Create password"
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

                            {/* Confirm Password */}
                            <div>
                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="confirmPassword">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                        placeholder="Confirm password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-cambridge-blue-500 hover:text-golden-brown-500"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Bank Details Section - Only animated at the section level */}
                        <AnimatePresence>
                            {(formData.role !== 'vendor') && (
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                    variants={bankDetailsAnimation}
                                    className="overflow-hidden"
                                >
                                    <div className="pt-1 pb-3">
                                        <h3 className="text-sm font-medium text-cambridge-blue-800 border-b border-cambridge-blue-100 pb-2 mb-3">
                                            Bank Details
                                        </h3>

                                        {/* Bank Details - First Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                            {/* Account Name */}
                                            <div>
                                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="bankDetails.accountName">
                                                    Account Holder Name
                                                </label>
                                                <input
                                                    id="bankDetails.accountName"
                                                    name="bankDetails.accountName"
                                                    type="text"
                                                    value={formData.bankDetails.accountName}
                                                    onChange={handleChange}
                                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                                    placeholder="Account holder name"
                                                    required={formData.role !== 'vendor'}
                                                />
                                            </div>

                                            {/* Account Number */}
                                            <div>
                                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="bankDetails.accountNumber">
                                                    Account Number
                                                </label>
                                                <input
                                                    id="bankDetails.accountNumber"
                                                    name="bankDetails.accountNumber"
                                                    type="text"
                                                    value={formData.bankDetails.accountNumber}
                                                    onChange={handleChange}
                                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                                    placeholder="Account number"
                                                    required={formData.role !== 'vendor'}
                                                />
                                            </div>
                                        </div>

                                        {/* Bank Details - Second Row */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {/* Bank Name */}
                                            <div>
                                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="bankDetails.bankName">
                                                    Bank Name
                                                </label>
                                                <input
                                                    id="bankDetails.bankName"
                                                    name="bankDetails.bankName"
                                                    type="text"
                                                    value={formData.bankDetails.bankName}
                                                    onChange={handleChange}
                                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                                    placeholder="Bank name"
                                                    required={formData.role !== 'vendor'}
                                                />
                                            </div>

                                            {/* Branch */}
                                            <div>
                                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1" htmlFor="bankDetails.branch">
                                                    Branch
                                                </label>
                                                <input
                                                    id="bankDetails.branch"
                                                    name="bankDetails.branch"
                                                    type="text"
                                                    value={formData.bankDetails.branch}
                                                    onChange={handleChange}
                                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                                    placeholder="Branch name"
                                                    required={formData.role !== 'vendor'}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Submit Button */}
                        <div className="max-w-md mx-auto">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                                        Creating Account...
                                    </>
                                ) : (
                                    'Create Account'
                                )}
                            </button>

                            {/* Login Link */}
                            <div className="mt-6 text-center text-sm">
                                <p className="text-cambridge-blue-700">
                                    Already have an account?{" "}
                                    <Link
                                        to={"/sign-in"}
                                        className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline transition-colors"
                                    >
                                        {"Sign in"}
                                    </Link>
                                </p>

                                <div className="mt-4 text-xs text-cambridge-blue-600">
                                    <span>By creating an account, you agree to our </span>
                                    <Link to="/terms" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">Terms of Service</Link>
                                    <span> and </span>
                                    <Link to="/privacy" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">Privacy Policy</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </div>
    )
}

export default SignUp;