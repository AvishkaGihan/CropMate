import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Eye,
    EyeOff,
    LogIn,
    UserPlus,
    ChevronLeft,
    ChevronRight,
    Leaf,
    CheckCircle2,
    XCircle,
    ShieldCheck,
    MapPin,
    Truck,
    Store,
    Upload
} from 'lucide-react';

import {
    Form,
    FormInput,
    FormButton,
    FormCheckbox,
    FormSelect,
    FormTextarea
} from '../../components/Shared/Form';

// Import farm image (use the same image as SignIn for consistency)
import FarmImage from '../../assets/images/farm-landscape.jpg';

const SignUp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Basic info
        email: '',
        password: '',
        confirmPassword: '',
        role: 'farmer',
        fullName: '',
        phone: '',

        // Farmer specific
        farmName: '',
        farmLocation: '',
        cropTypes: [],

        // Driver specific
        vehicleType: '',
        vehicleCapacity: '',
        licenseNumber: '',
        licenseExpiry: '',

        // Vendor specific
        businessName: '',
        businessType: '',
        businessAddress: '',

        // Agreement
        agreeToTerms: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Parse role from URL parameter if present
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get('as');
        if (role && ['farmer', 'driver', 'vendor'].includes(role)) {
            setFormData(prev => ({ ...prev, role }));
        }
    }, [location]);

    // Auto-dismiss success message after 5 seconds
    useEffect(() => {
        if (successMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    // Handle multiple selection for crop types
    const handleCropTypeChange = (cropType) => {
        setFormData(prev => {
            const updatedCropTypes = prev.cropTypes.includes(cropType)
                ? prev.cropTypes.filter(type => type !== cropType)
                : [...prev.cropTypes, cropType];

            return {
                ...prev,
                cropTypes: updatedCropTypes
            };
        });
    };

    const validateStep = () => {
        const newErrors = {};

        if (step === 1) {
            // Validate role selection and basic information
            if (!formData.role) {
                newErrors.role = 'Please select your role';
            }

            if (!formData.fullName.trim()) {
                newErrors.fullName = 'Full name is required';
            }

            if (!formData.email.trim()) {
                newErrors.email = 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Please enter a valid email address';
            }

            if (!formData.phone.trim()) {
                newErrors.phone = 'Phone number is required';
            }

            if (!formData.password) {
                newErrors.password = 'Password is required';
            } else if (formData.password.length < 8) {
                newErrors.password = 'Password must be at least 8 characters';
            }

            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Please confirm your password';
            } else if (formData.password !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Passwords do not match';
            }
        } else if (step === 2) {
            // Validate role-specific information
            if (formData.role === 'farmer') {
                if (!formData.farmLocation.trim()) {
                    newErrors.farmLocation = 'Farm location is required';
                }

                if (formData.cropTypes.length === 0) {
                    newErrors.cropTypes = 'Please select at least one crop type';
                }
            } else if (formData.role === 'driver') {
                if (!formData.vehicleType) {
                    newErrors.vehicleType = 'Vehicle type is required';
                }

                if (!formData.vehicleCapacity) {
                    newErrors.vehicleCapacity = 'Vehicle capacity is required';
                }

                if (!formData.licenseNumber) {
                    newErrors.licenseNumber = 'License number is required';
                }

                if (!formData.licenseExpiry) {
                    newErrors.licenseExpiry = 'License expiry date is required';
                }
            } else if (formData.role === 'vendor') {
                if (!formData.businessName.trim()) {
                    newErrors.businessName = 'Business name is required';
                }

                if (!formData.businessType) {
                    newErrors.businessType = 'Business type is required';
                }

                if (!formData.businessAddress.trim()) {
                    newErrors.businessAddress = 'Business address is required';
                }
            }
        } else if (step === 3) {
            // Validate terms agreement
            if (!formData.agreeToTerms) {
                newErrors.agreeToTerms = 'You must agree to the terms and conditions';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (validateStep()) {
            setStep(prevStep => prevStep + 1);
            window.scrollTo(0, 0);
        }
    };

    const handlePrevStep = () => {
        setStep(prevStep => prevStep - 1);
        window.scrollTo(0, 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateStep()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real app, you would call your registration API here
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Simulate successful registration
            console.log('Registration successful:', formData);

            // Show success animation before redirect
            setSuccessMessage('Account created successfully! Redirecting to login...');

            // Delay redirect to show the success message
            setTimeout(() => {
                navigate(`/signin?registered=true&role=${formData.role}`);
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ form: 'Registration failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Select role
    const selectRole = (role) => {
        setFormData(prev => ({ ...prev, role }));
        // Clear role error if it exists
        if (errors.role) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.role;
                return newErrors;
            });
        }
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    // Predefined classes for role cards
    const roleCardClasses = {
        farmer: {
            selected: "bg-cal-poly-green-100 border-cal-poly-green-500 ring-2 ring-cal-poly-green-500",
            default: "bg-cal-poly-green-50 border-cal-poly-green-200 hover:bg-cal-poly-green-100",
            iconBg: {
                selected: "bg-cal-poly-green-600",
                default: "bg-cal-poly-green-500"
            },
            text: "text-cal-poly-green-700",
            button: "bg-cal-poly-green-600 hover:bg-cal-poly-green-700",
            progress: "bg-cal-poly-green-500"
        },
        driver: {
            selected: "bg-cambridge-blue-100 border-cambridge-blue-500 ring-2 ring-cambridge-blue-500",
            default: "bg-cambridge-blue-50 border-cambridge-blue-200 hover:bg-cambridge-blue-100",
            iconBg: {
                selected: "bg-cambridge-blue-600",
                default: "bg-cambridge-blue-500"
            },
            text: "text-cambridge-blue-700",
            button: "bg-cambridge-blue-600 hover:bg-cambridge-blue-700",
            progress: "bg-cambridge-blue-500"
        },
        vendor: {
            selected: "bg-golden-brown-100 border-golden-brown-500 ring-2 ring-golden-brown-500",
            default: "bg-golden-brown-50 border-golden-brown-200 hover:bg-golden-brown-100",
            iconBg: {
                selected: "bg-golden-brown-600",
                default: "bg-golden-brown-500"
            },
            text: "text-golden-brown-700",
            button: "bg-golden-brown-600 hover:bg-golden-brown-700",
            progress: "bg-golden-brown-500"
        }
    };

    // Get button classes based on selected role
    const getButtonClasses = () => {
        const baseClasses = "shadow-sm hover:shadow-md transition-shadow";

        if (formData.role === 'farmer') {
            return `${baseClasses} ${roleCardClasses.farmer.button} text-white`;
        } else if (formData.role === 'driver') {
            return `${baseClasses} ${roleCardClasses.driver.button} text-white`;
        } else if (formData.role === 'vendor') {
            return `${baseClasses} ${roleCardClasses.vendor.button} text-white`;
        }

        return `${baseClasses} bg-cambridge-blue-600 hover:bg-cambridge-blue-700 text-white`;
    };

    // Role selection card component
    const RoleCard = ({ role, title, icon, onClick, isSelected }) => {
        const roleClass = roleCardClasses[role];

        return (
            <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onClick(role)}
                className={`cursor-pointer p-4 rounded-lg border transition-all duration-300 flex flex-col items-center ${isSelected ? roleClass.selected : roleClass.default
                    }`}
            >
                <div className={`w-10 h-10 rounded-full ${isSelected ? roleClass.iconBg.selected : roleClass.iconBg.default
                    } flex items-center justify-center mb-2`}>
                    {icon}
                </div>
                <span className={`${roleClass.text} font-medium text-sm`}>{title}</span>
            </motion.div>
        );
    };

    // Form step indicator
    const StepIndicator = () => {
        const getProgressClass = (stepNum) => {
            const role = formData.role || 'farmer';
            const baseClasses = "rounded-full transition-all duration-300";

            if (stepNum === step) {
                return `${baseClasses} w-8 h-2.5 ${roleCardClasses[role].progress}`;
            } else if (stepNum < step) {
                return `${baseClasses} w-2.5 h-2.5 ${roleCardClasses[role].progress}`;
            } else {
                return `${baseClasses} w-2.5 h-2.5 bg-gray-300`;
            }
        };

        return (
            <div className="flex items-center justify-center space-x-2 mb-6">
                <div className={getProgressClass(1)}></div>
                <div className={getProgressClass(2)}></div>
                <div className={getProgressClass(3)}></div>
            </div>
        );
    };

    // Crop types options
    const cropTypes = [
        { id: "rice", label: "Rice" },
        { id: "vegetables", label: "Vegetables" },
        { id: "fruits", label: "Fruits" },
        { id: "corn", label: "Corn" },
        { id: "wheat", label: "Wheat" },
        { id: "soybeans", label: "Soybeans" },
        { id: "other", label: "Other" }
    ];

    // Vehicle types
    const vehicleTypes = [
        { value: "small_truck", label: "Small Truck (1-3 tons)" },
        { value: "medium_truck", label: "Medium Truck (3-7 tons)" },
        { value: "large_truck", label: "Large Truck (7+ tons)" },
        { value: "pickup", label: "Pickup Truck" },
        { value: "van", label: "Van" },
        { value: "other", label: "Other" }
    ];

    // Business types
    const businessTypes = [
        { value: "grocery", label: "Grocery Store" },
        { value: "supermarket", label: "Supermarket" },
        { value: "restaurant", label: "Restaurant" },
        { value: "wholesaler", label: "Wholesaler" },
        { value: "processor", label: "Food Processor" },
        { value: "exporter", label: "Exporter" },
        { value: "other", label: "Other" }
    ];

    // Render step content
    const renderStepContent = () => {
        if (step === 1) {
            return (
                <>
                    <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Account Information</h2>

                    {/* Role Selection */}
                    <div className="mb-6">
                        <label className="block text-cambridge-blue-700 text-sm font-medium mb-3">
                            I am a:
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                            <RoleCard
                                role="farmer"
                                title="Farmer"
                                icon={<Leaf size={20} className="text-white" />}
                                onClick={selectRole}
                                isSelected={formData.role === 'farmer'}
                            />

                            <RoleCard
                                role="driver"
                                title="Driver"
                                icon={<Truck size={20} className="text-white" />}
                                onClick={selectRole}
                                isSelected={formData.role === 'driver'}
                            />

                            <RoleCard
                                role="vendor"
                                title="Vendor"
                                icon={<Store size={20} className="text-white" />}
                                onClick={selectRole}
                                isSelected={formData.role === 'vendor'}
                            />
                        </div>
                        {errors.role && (
                            <p className="mt-2 text-red-600 text-sm">{errors.role}</p>
                        )}
                    </div>

                    <FormInput
                        label="Full Name"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                        error={errors.fullName}
                    />

                    <FormInput
                        label="Email Address"
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="name@example.com"
                        required
                        error={errors.email}
                    />

                    <FormInput
                        label="Phone Number"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        required
                        error={errors.phone}
                    />

                    <div className="relative">
                        <FormInput
                            label="Password"
                            id="password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            iconRight={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            iconRightClassName='text-cambridge-blue-500 cursor-pointer'
                            onIconRightClick={() => setShowPassword(!showPassword)}
                        />
                    </div>

                    <div className="relative">
                        <FormInput
                            label="Confirm Password"
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm your password"
                            required
                            iconRight={showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            iconRightClassName='text-cambridge-blue-500 cursor-pointer'
                            onIconRightClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            error={errors.confirmPassword}
                        />
                    </div>
                </>
            );
        } else if (step === 2) {
            if (formData.role === 'farmer') {
                return (
                    <>
                        <h2 className="text-xl font-bold text-cal-poly-green-800 mb-6">Farm Details</h2>

                        <FormInput
                            label="Farm Name (optional)"
                            id="farmName"
                            name="farmName"
                            value={formData.farmName}
                            onChange={handleChange}
                            placeholder="Enter your farm name"
                            error={errors.farmName}
                        />

                        <FormTextarea
                            label="Farm Location"
                            id="farmLocation"
                            name="farmLocation"
                            value={formData.farmLocation}
                            onChange={handleChange}
                            placeholder="Enter your farm address or location"
                            required
                            error={errors.farmLocation}
                            rows={3}
                            iconLeft={<MapPin size={20} className="text-cal-poly-green-400" />}
                        />

                        <div className="mb-6">
                            <label className="block text-cambridge-blue-700 text-sm font-medium mb-2">
                                Crops You Grow <span className="text-red-500">*</span>
                            </label>

                            <div className="grid grid-cols-2 gap-2 p-3 bg-white rounded-lg border border-cal-poly-green-200">
                                {cropTypes.map(crop => (
                                    <div key={crop.id} className="flex items-center">
                                        <FormCheckbox
                                            id={`crop-${crop.id}`}
                                            checked={formData.cropTypes.includes(crop.id)}
                                            onChange={() => handleCropTypeChange(crop.id)}
                                            label={crop.label}
                                        />
                                    </div>
                                ))}
                            </div>

                            {errors.cropTypes && (
                                <p className="mt-2 text-red-600 text-sm">{errors.cropTypes}</p>
                            )}
                        </div>
                    </>
                );
            } else if (formData.role === 'driver') {
                return (
                    <>
                        <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Vehicle & License Details</h2>

                        <FormSelect
                            label="Vehicle Type"
                            id="vehicleType"
                            name="vehicleType"
                            value={formData.vehicleType}
                            onChange={handleChange}
                            options={vehicleTypes}
                            placeholder="Select your vehicle type"
                            required
                            error={errors.vehicleType}
                        />

                        <FormInput
                            label="Vehicle Capacity"
                            id="vehicleCapacity"
                            name="vehicleCapacity"
                            value={formData.vehicleCapacity}
                            onChange={handleChange}
                            placeholder="e.g., 2 tons, 5000 kg"
                            required
                            error={errors.vehicleCapacity}
                        />

                        <FormInput
                            label="Driver's License Number"
                            id="licenseNumber"
                            name="licenseNumber"
                            value={formData.licenseNumber}
                            onChange={handleChange}
                            placeholder="Enter your license number"
                            required
                            error={errors.licenseNumber}
                        />

                        <FormInput
                            label="License Expiry Date"
                            id="licenseExpiry"
                            name="licenseExpiry"
                            type="date"
                            value={formData.licenseExpiry}
                            onChange={handleChange}
                            required
                            error={errors.licenseExpiry}
                        />

                        <div className="mb-6">
                            <label className="block text-cambridge-blue-700 text-sm font-medium mb-2">
                                License Image (Optional)
                            </label>

                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-cambridge-blue-300 rounded-md">
                                <div className="space-y-1 text-center">
                                    <Upload size={24} className="mx-auto text-cambridge-blue-400" />
                                    <div className="flex text-sm text-cambridge-blue-600">
                                        <label
                                            htmlFor="license-upload"
                                            className="relative cursor-pointer bg-white rounded-md font-medium text-cambridge-blue-600 hover:text-cambridge-blue-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input id="license-upload" name="license-upload" type="file" className="sr-only" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-cambridge-blue-500">
                                        PNG, JPG, GIF up to 10MB
                                    </p>
                                </div>
                            </div>
                        </div>
                    </>
                );
            } else if (formData.role === 'vendor') {
                return (
                    <>
                        <h2 className="text-xl font-bold text-golden-brown-800 mb-6">Business Details</h2>

                        <FormInput
                            label="Business Name"
                            id="businessName"
                            name="businessName"
                            value={formData.businessName}
                            onChange={handleChange}
                            placeholder="Enter your business name"
                            required
                            error={errors.businessName}
                        />

                        <FormSelect
                            label="Business Type"
                            id="businessType"
                            name="businessType"
                            value={formData.businessType}
                            onChange={handleChange}
                            options={businessTypes}
                            placeholder="Select your business type"
                            required
                            error={errors.businessType}
                        />

                        <FormTextarea
                            label="Business Address"
                            id="businessAddress"
                            name="businessAddress"
                            value={formData.businessAddress}
                            onChange={handleChange}
                            placeholder="Enter your business address"
                            required
                            error={errors.businessAddress}
                            rows={3}
                            iconLeft={<MapPin size={20} className="text-golden-brown-400" />}
                        />
                    </>
                );
            } else {
                return (
                    <div className="text-center py-8">
                        <p className="text-cambridge-blue-800">Please select a role to continue.</p>
                    </div>
                );
            }
        } else if (step === 3) {
            return (
                <>
                    <h2 className="text-xl font-bold text-cambridge-blue-800 mb-6">Review & Submit</h2>

                    <div className="mb-6 p-4 bg-cambridge-blue-50 rounded-lg border border-cambridge-blue-100">
                        <h3 className="font-medium text-cambridge-blue-800 mb-2">Account Information</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div className="text-cambridge-blue-600">Role:</div>
                            <div className="font-medium">{formData.role ? formData.role.charAt(0).toUpperCase() + formData.role.slice(1) : 'Not selected'}</div>

                            <div className="text-cambridge-blue-600">Name:</div>
                            <div className="font-medium">{formData.fullName}</div>

                            <div className="text-cambridge-blue-600">Email:</div>
                            <div className="font-medium">{formData.email}</div>

                            <div className="text-cambridge-blue-600">Phone:</div>
                            <div className="font-medium">{formData.phone}</div>
                        </div>
                    </div>

                    {formData.role === 'farmer' && (
                        <div className="mb-6 p-4 bg-cal-poly-green-50 rounded-lg border border-cal-poly-green-100">
                            <h3 className="font-medium text-cal-poly-green-800 mb-2">Farm Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-cal-poly-green-600">Farm Name:</div>
                                <div className="font-medium">{formData.farmName || 'Not provided'}</div>

                                <div className="text-cal-poly-green-600">Location:</div>
                                <div className="font-medium">{formData.farmLocation}</div>

                                <div className="text-cal-poly-green-600">Crops:</div>
                                <div className="font-medium">
                                    {formData.cropTypes.length > 0
                                        ? formData.cropTypes.map(cropId => {
                                            const crop = cropTypes.find(c => c.id === cropId);
                                            return crop ? crop.label : cropId;
                                        }).join(', ')
                                        : 'None selected'
                                    }
                                </div>
                            </div>
                        </div>
                    )}

                    {formData.role === 'driver' && (
                        <div className="mb-6 p-4 bg-cambridge-blue-50 rounded-lg border border-cambridge-blue-100">
                            <h3 className="font-medium text-cambridge-blue-800 mb-2">Vehicle & License Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-cambridge-blue-600">Vehicle Type:</div>
                                <div className="font-medium">
                                    {formData.vehicleType
                                        ? vehicleTypes.find(v => v.value === formData.vehicleType)?.label || formData.vehicleType
                                        : 'Not selected'
                                    }
                                </div>

                                <div className="text-cambridge-blue-600">Capacity:</div>
                                <div className="font-medium">{formData.vehicleCapacity}</div>

                                <div className="text-cambridge-blue-600">License Number:</div>
                                <div className="font-medium">{formData.licenseNumber}</div>

                                <div className="text-cambridge-blue-600">License Expiry:</div>
                                <div className="font-medium">{formData.licenseExpiry}</div>
                            </div>
                        </div>
                    )}

                    {formData.role === 'vendor' && (
                        <div className="mb-6 p-4 bg-golden-brown-50 rounded-lg border border-golden-brown-100">
                            <h3 className="font-medium text-golden-brown-800 mb-2">Business Details</h3>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                                <div className="text-golden-brown-600">Business Name:</div>
                                <div className="font-medium">{formData.businessName}</div>

                                <div className="text-golden-brown-600">Business Type:</div>
                                <div className="font-medium">
                                    {formData.businessType
                                        ? businessTypes.find(b => b.value === formData.businessType)?.label || formData.businessType
                                        : 'Not selected'
                                    }
                                </div>

                                <div className="text-golden-brown-600">Address:</div>
                                <div className="font-medium">{formData.businessAddress}</div>
                            </div>
                        </div>
                    )}

                    <div className="mb-6 p-4 bg-cambridge-blue-50/50 rounded-lg border border-cambridge-blue-100/50">
                        <div className="flex items-start">
                            <ShieldCheck className="h-5 w-5 text-cal-poly-green-500 mt-0.5 mr-2" />
                            <p className="text-sm text-cambridge-blue-600">
                                Your information is secure. We use industry-standard encryption to protect your data.
                            </p>
                        </div>
                    </div>

                    <FormCheckbox
                        id="agreeToTerms"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        label={
                            <span className="text-sm">
                                I agree to the <Link to="/terms" className="text-golden-brown-600 hover:text-golden-brown-700 underline">Terms of Service</Link> and <Link to="/privacy" className="text-golden-brown-600 hover:text-golden-brown-700 underline">Privacy Policy</Link>
                            </span>
                        }
                        error={errors.agreeToTerms}
                    />
                </>
            );
        }

        return null;
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Column - Image */}
            <div className="hidden md:block md:w-1/2 bg-cambridge-blue-700 relative overflow-hidden">
                {/* Same background image as SignIn for consistency */}
                <img
                    src={FarmImage || "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1932&q=80"}
                    alt="Farm landscape"
                    className="absolute inset-0 w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-cambridge-blue-900/90 to-cambridge-blue-700/50"></div>

                {/* Overlay content */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-12">
                    <div className="max-w-md text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="mb-6"
                        >
                            <div className="w-20 h-20 mx-auto bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 border border-white/20">
                                <Leaf size={40} className="text-mindaro-400" />
                            </div>
                            <h2 className="text-3xl font-bold mb-3">Join CropMate Today</h2>
                            <p className="text-white/80 text-lg">
                                Create your account and start connecting with the agricultural ecosystem
                            </p>
                        </motion.div>

                        <div className="mt-8">
                            <div className="flex items-center justify-center mb-4">
                                <div className="h-px bg-white/20 flex-1"></div>
                                <span className="px-4 text-white/60 text-sm">BENEFITS</span>
                                <div className="h-px bg-white/20 flex-1"></div>
                            </div>

                            <motion.ul
                                className="space-y-4 text-left"
                                initial="hidden"
                                animate="visible"
                                variants={containerVariants}
                            >
                                <motion.li
                                    className="flex items-start"
                                    variants={itemVariants}
                                >
                                    <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                                        <CheckCircle2 size={16} className="text-mindaro-400" />
                                    </div>
                                    <span className="text-white/90">Access to market insights and pricing trends</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-start"
                                    variants={itemVariants}
                                >
                                    <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                                        <CheckCircle2 size={16} className="text-mindaro-400" />
                                    </div>
                                    <span className="text-white/90">Direct connections with buyers, sellers, and transporters</span>
                                </motion.li>
                                <motion.li
                                    className="flex items-start"
                                    variants={itemVariants}
                                >
                                    <div className="bg-cal-poly-green-500/20 p-2 rounded-full mr-3 mt-0.5">
                                        <CheckCircle2 size={16} className="text-mindaro-400" />
                                    </div>
                                    <span className="text-white/90">Secure payment processing and transaction history</span>
                                </motion.li>
                            </motion.ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column - Sign Up Form */}
            <div className="w-full md:w-1/2 bg-cambridge-blue-50 flex items-center justify-center p-6">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="max-w-md w-full"
                >
                    {/* Notification Messages */}
                    <AnimatePresence>
                        {successMessage && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="mb-6 p-4 bg-cal-poly-green-50 border border-cal-poly-green-200 rounded-lg text-cal-poly-green-700 text-sm flex items-start"
                            >
                                <CheckCircle2 size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                                <span>{successMessage}</span>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Logo and Title */}
                    <motion.div
                        variants={itemVariants}
                        className="text-center mb-6"
                    >
                        <Link to="/" className="inline-block mb-5">
                            <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center shadow-lg group hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                                <div className="text-mindaro-400 transition-transform duration-500 group-hover:rotate-12">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
                                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <h1 className="text-3xl font-bold text-cambridge-blue-800 mb-1">Create Your Account</h1>
                        <p className="text-cambridge-blue-600 mb-3">Join the CropMate community</p>

                        {/* Step indicator */}
                        <StepIndicator />
                    </motion.div>

                    {/* Sign Up Form */}
                    <motion.div
                        variants={itemVariants}
                        className="rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white"
                    >
                        {errors.form && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-start">
                                <XCircle size={18} className="mr-2 flex-shrink-0 mt-0.5" />
                                <span>{errors.form}</span>
                            </div>
                        )}

                        <Form onSubmit={handleSubmit}>
                            {renderStepContent()}

                            <div className="flex justify-between mt-8">
                                {step > 1 && (
                                    <FormButton
                                        type="button"
                                        variant="outline"
                                        onClick={handlePrevStep}
                                        size="md"
                                        className="border-cambridge-blue-300 text-cambridge-blue-700"
                                        icon={<ChevronLeft size={16} />}
                                        iconPosition="left"
                                    >
                                        Back
                                    </FormButton>
                                )}

                                {step < 3 ? (
                                    <FormButton
                                        type="button"
                                        variant="primary"
                                        onClick={handleNextStep}
                                        size="md"
                                        className={`${getButtonClasses()} ml-auto`}
                                        icon={<ChevronRight size={16} />}
                                        iconPosition="right"
                                    >
                                        Next
                                    </FormButton>
                                ) : (
                                    <FormButton
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth={!step > 1}
                                        className={getButtonClasses()}
                                        icon={<UserPlus size={18} />}
                                        isLoading={isSubmitting}
                                    >
                                        Create Account
                                    </FormButton>
                                )}
                            </div>
                        </Form>

                        <div className="mt-6 text-center text-cambridge-blue-700">
                            <p>Already have an account? <Link to="/sign-in" className="text-golden-brown-600 hover:text-golden-brown-700 font-medium hover:underline transition-colors">Sign in</Link></p>
                        </div>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="mt-8 text-center"
                    >
                        <div className="text-sm text-cambridge-blue-600">
                            <span>Need help? </span>
                            <Link to="/contact" className="text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline">Contact Support</Link>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default SignUp;