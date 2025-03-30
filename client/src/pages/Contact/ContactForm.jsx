import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormInput } from '../../components/Shared/FormInput';
import { FormSelect } from '../../components/Shared/FormSelect';
import SectionWrapper from '../../components/Shared/SectionWrapper';
import SectionHeader from '../../components/Shared/SectionHeader';
import SuccessMessage from '../../components/Contact/SuccessMessage';
import SocialSidebar from '../../components/Contact/SocialSidebar';
import { containerVariants, itemVariants } from '../../util/animations';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
        userType: 'farmer'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    // User type options
    const userTypeOptions = [
        { value: 'farmer', label: 'Farmer' },
        { value: 'vendor', label: 'Vendor' },
        { value: 'transporter', label: 'Transporter' },
        { value: 'partner', label: 'Potential Partner' },
        { value: 'other', label: 'Other' }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }

        if (!formData.message.trim()) {
            newErrors.message = 'Message is required';
        } else if (formData.message.trim().length < 10) {
            newErrors.message = 'Message must be at least 10 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulated API call - replace with actual API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            console.log('Form submitted:', formData);
            setSubmitted(true);
            // Reset form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: '',
                userType: 'farmer'
            });
        } catch (err) {
            setErrors({ form: 'Something went wrong. Please try again later.' });
            console.error('Form submission error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    const resetForm = () => {
        setSubmitted(false);
        setErrors({});
    };

    return (
        <SectionWrapper className="py-20 bg-white" withGlow>
            <motion.div
                className="container mx-auto px-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <SectionHeader
                    badge="Contact Form"
                    title="Send us a"
                    special=" Message"
                    description="Fill out the form below and our team will get back to you as soon as possible."
                />

                <div className="max-w-4xl mx-auto mt-16">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            {submitted ? (
                                <SuccessMessage onReset={resetForm} />
                            ) : (
                                <motion.div
                                    className="bg-white border border-cambridge-blue-100/50 rounded-xl p-6 md:p-8 shadow-sm"
                                    variants={itemVariants}
                                >
                                    {errors.form && (
                                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                            {errors.form}
                                        </div>
                                    )}

                                    <form onSubmit={handleSubmit} className="w-full" noValidate>
                                        <div className="space-y-6">
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="w-full md:w-1/2">
                                                    <FormInput
                                                        label="Your Name"
                                                        name="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        required={true}
                                                        className=""
                                                    />
                                                    {errors.name && (
                                                        <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                                                    )}
                                                </div>

                                                <div className="w-full md:w-1/2">
                                                    <FormInput
                                                        type="email"
                                                        label="Email Address"
                                                        name="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        required={true}
                                                        className=""
                                                    />
                                                    {errors.email && (
                                                        <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                                                    )}
                                                </div>
                                            </div>

                                            <div>
                                                <FormSelect
                                                    label="I am a"
                                                    id="userType"
                                                    name="userType"
                                                    value={formData.userType}
                                                    onChange={handleChange}
                                                    options={userTypeOptions}
                                                    required={true}
                                                />
                                            </div>

                                            <div>
                                                <FormInput
                                                    label="Subject"
                                                    name="subject"
                                                    value={formData.subject}
                                                    onChange={handleChange}
                                                    placeholder="How can we help you?"
                                                    required={true}
                                                    className=""
                                                />
                                                {errors.subject && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                                                )}
                                            </div>

                                            <div>
                                                <label className="block text-cambridge-blue-800 text-sm font-medium mb-1">
                                                    Your Message
                                                </label>
                                                <textarea
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    placeholder="Tell us how we can assist you..."
                                                    required
                                                    rows={4}
                                                    maxLength={500}
                                                    className="w-full p-2.5 border border-cambridge-blue-200 rounded-lg bg-white focus:ring-2 focus:ring-golden-brown-300 focus:border-golden-brown-500 outline-none transition-all hover:border-golden-brown-300"
                                                />
                                                <div className="mt-1 text-xs text-right text-cambridge-blue-500/70">
                                                    {formData.message.length}/500 characters
                                                </div>
                                                {errors.message && (
                                                    <p className="mt-1 text-xs text-red-500">{errors.message}</p>
                                                )}
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isSubmitting}
                                                className="w-full py-2.5 px-4 bg-golden-brown-600 hover:bg-golden-brown-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center"
                                            >
                                                {isSubmitting ? (
                                                    <>
                                                        <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                                                        Sending message...
                                                    </>
                                                ) : (
                                                    'Send Message'
                                                )}
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            )}
                        </div>

                        <SocialSidebar />
                    </div>
                </div>
            </motion.div>
        </SectionWrapper>
    );
};

export default ContactForm;