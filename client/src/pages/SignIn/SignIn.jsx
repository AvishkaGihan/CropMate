import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, EyeOff, LogIn } from 'lucide-react';

import { Form, FormInput, FormButton, FormCheckbox } from '../../components/Shared/Form';
import AuthLayout from '../../layouts/AuthLayout';
import {
    BenefitsSection,
    LogoSection,
    RoleSelector,
    SuccessMessage,
    ErrorMessage,
    AuthFooter
} from '../../components/Auth';
import { getButtonClasses } from '../../util/Auth/getButtonClasses';
import { itemVariants } from '../../util/Auth/animations';
import { validateSigninForm } from '../../util/Auth/FormValidation';

const SignIn = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
        role: 'farmer'
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    // Check for success message from registration
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const success = params.get('registered');
        if (success === 'true') {
            setSuccessMessage('Your account was created successfully! Please sign in.');
        }

        // Check for role from URL params
        const role = params.get('role');
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

    const validateForm = useCallback(() => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData]);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();

        const newErrors = validateSigninForm(formData);
        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        setIsSubmitting(true);

        try {
            // In a real app, you would call your authentication API here
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Show success animation before redirect
            setSuccessMessage(`Login successful as ${formData.role}! Redirecting to dashboard...`);

            // Delay redirect to show the success message
            setTimeout(() => {
                navigate(`/dashboard/${formData.role}`);
            }, 1500);
        } catch (error) {
            setErrors({ form: 'Invalid email or password. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    }, [formData, validateForm, navigate]);

    const selectRole = useCallback((role) => {
        setFormData(prev => ({ ...prev, role }));
        if (errors.role) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.role;
                return newErrors;
            });
        }
    }, [errors]);

    const toggleShowPassword = useCallback(() => {
        setShowPassword(prev => !prev);
    }, []);

    // Left content - benefits section
    const leftContent = <BenefitsSection />;

    // Right content - form
    const rightContent = (
        <div className="rounded-xl shadow-md border border-cambridge-blue-100/50 p-8 bg-white">
            <AnimatePresence>
                {successMessage && <SuccessMessage message={successMessage} />}
            </AnimatePresence>

            <LogoSection />

            <RoleSelector
                selectedRole={formData.role}
                onSelectRole={selectRole}
            />

            <motion.div variants={itemVariants}>
                {errors.form && <ErrorMessage message={errors.form} />}

                <Form onSubmit={handleSubmit}>
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
                            onIconRightClick={toggleShowPassword}
                            error={errors.password}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                        <FormCheckbox
                            id="rememberMe"
                            name="rememberMe"
                            label="Remember me"
                            checked={formData.rememberMe}
                            onChange={handleChange}
                        />
                        <Link
                            to="/forgot-password"
                            className="text-sm text-golden-brown-600 hover:text-golden-brown-700 transition-colors hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <FormButton
                        type="submit"
                        variant="primary"
                        size="lg"
                        fullWidth
                        icon={<LogIn size={18} />}
                        isLoading={isSubmitting}
                        className={getButtonClasses(formData.role)}
                    >
                        Sign In {formData.role ? `as ${formData.role}` : ''}
                    </FormButton>
                </Form>

                <AuthFooter isSignIn={true} />
            </motion.div>
        </div>
    );

    return (
        <AuthLayout
            leftContent={leftContent}
            rightContent={rightContent}
        />
    );
};

export default SignIn;