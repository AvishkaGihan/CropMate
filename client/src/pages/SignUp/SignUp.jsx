import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, ChevronLeft, ChevronRight, UserPlus } from 'lucide-react';

import { Form, FormInput, FormButton, FormCheckbox } from '../../components/Shared/Form';
import AuthLayout from '../../layouts/AuthLayout';
import {
    BenefitsSection,
    LogoSection,
    RoleSelector,
    SuccessMessage,
    ErrorMessage,
    AuthFooter,
    StepIndicator,
    AccountInformationStep,
    RoleSpecificForms,
    ReviewStep
} from '../../components/Auth';
import { getButtonClasses } from '../../util/Auth/getButtonClasses';
import { itemVariants } from '../../util/Auth/animations';
import { validateSignupForm } from '../../util/Auth/FormValidation';

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
        // Farmer fields
        farmName: '',
        farmLocation: '',
        cropTypes: [],
        // Driver fields
        vehicleType: 'pickup',
        vehicleCapacity: '',
        licenseNumber: '',
        licenseExpiry: '',
        // Vendor fields
        businessName: '',
        businessType: 'retailer',
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

    // Form field change handler
    const handleChange = useCallback((e) => {
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
    }, [errors]);

    // Handle multiple selection for crop types
    const handleCropTypeChange = useCallback((cropType) => {
        setFormData(prev => {
            const updatedCropTypes = prev.cropTypes.includes(cropType)
                ? prev.cropTypes.filter(type => type !== cropType)
                : [...prev.cropTypes, cropType];

            return {
                ...prev,
                cropTypes: updatedCropTypes
            };
        });
    }, []);

    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    const toggleShowConfirmPassword = useCallback(() => {
        setShowConfirmPassword(prev => !prev);
    }, []);

    const handleNextStep = useCallback(() => {
        const newErrors = validateSignupForm(step, formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setStep(prevStep => prevStep + 1);
            window.scrollTo(0, 0);
        }
    }, [step, formData]);

    const handlePrevStep = useCallback(() => {
        setStep(prevStep => prevStep - 1);
        window.scrollTo(0, 0);
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const newErrors = validateSignupForm(step, formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
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
                navigate(`/sign-in?registered=true&role=${formData.role}`);
            }, 2000);
        } catch (error) {
            console.error('Registration error:', error);
            setErrors({ form: 'Registration failed. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [step, formData, navigate]);

    // Select role
    const selectRole = useCallback((role) => {
        setFormData(prev => ({ ...prev, role }));
        // Clear role error if it exists
        if (errors.role) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.role;
                return newErrors;
            });
        }
    }, [errors]);

    // Render step content
    const renderStepContent = useCallback(() => {
        switch (step) {
            case 1:
                return (
                    <AccountInformationStep
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                        selectRole={selectRole}
                        showPassword={showPassword}
                        toggleShowPassword={toggleShowPassword}
                        showConfirmPassword={showConfirmPassword}
                        toggleShowConfirmPassword={toggleShowConfirmPassword}
                    />
                );
            case 2:
                return (
                    <RoleSpecificForms
                        role={formData.role}
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                        handleCropTypeChange={handleCropTypeChange}
                    />
                );
            case 3:
                return (
                    <ReviewStep
                        formData={formData}
                        errors={errors}
                        handleChange={handleChange}
                    />
                );
            default:
                return null;
        }
    }, [
        step,
        formData,
        errors,
        handleChange,
        selectRole,
        showPassword,
        toggleShowPassword,
        showConfirmPassword,
        toggleShowConfirmPassword,
        handleCropTypeChange
    ]);

    // Benefits section content for left side
    const leftContent = (
        <BenefitsSection
            title="Join CropMate Today"
            subtitle="Create your account and start connecting with the agricultural ecosystem"
            benefits={[
                "Access to market insights and pricing trends",
                "Direct connections with buyers, sellers, and transporters",
                "Secure payment processing and transaction history"
            ]}
            headerLabel="BENEFITS"
        />
    );

    // Form content for right side
    const rightContent = (
        <motion.div
            variants={itemVariants}
            className="w-full"
        >
            {/* Notification Messages */}
            <AnimatePresence>
                {successMessage && <SuccessMessage message={successMessage} />}
            </AnimatePresence>

            {/* Logo and Title */}
            <LogoSection
                title="Create Your Account"
                subtitle="Join the CropMate community"
            />

            {/* Step indicator */}
            <StepIndicator step={step} role={formData.role} />

            {/* Sign Up Form */}
            <div className="rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white">
                {errors.form && <ErrorMessage message={errors.form} />}

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
                                className={`${getButtonClasses(formData.role)} ml-auto`}
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
                                fullWidth={!(step > 1)}
                                className={getButtonClasses(formData.role)}
                                icon={<UserPlus size={18} />}
                                isLoading={isSubmitting}
                            >
                                Create Account
                            </FormButton>
                        )}
                    </div>
                </Form>

                <AuthFooter isSignIn={false} />
            </div>
        </motion.div>
    );

    return (
        <AuthLayout
            leftContent={leftContent}
            rightContent={rightContent}
        />
    );
};

export default SignUp;