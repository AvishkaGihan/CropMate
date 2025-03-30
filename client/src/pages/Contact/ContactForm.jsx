import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Form,
    FormInput,
    FormSelect,
    FormTextarea,
    FormButton,
    FormGroup
} from '../../components/Shared/Form';
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

                                    <Form onSubmit={handleSubmit}>
                                        <FormGroup direction="column" spacing="default">
                                            <FormGroup direction="row" spacing="default">
                                                <div className="w-full md:w-1/2">
                                                    <FormInput
                                                        label="Your Name"
                                                        id="name"
                                                        value={formData.name}
                                                        onChange={handleChange}
                                                        placeholder="John Doe"
                                                        required
                                                        error={errors.name}
                                                    />
                                                </div>

                                                <div className="w-full md:w-1/2">
                                                    <FormInput
                                                        label="Email Address"
                                                        id="email"
                                                        type="email"
                                                        value={formData.email}
                                                        onChange={handleChange}
                                                        placeholder="john@example.com"
                                                        required
                                                        error={errors.email}
                                                    />
                                                </div>
                                            </FormGroup>

                                            <FormSelect
                                                label="I am a"
                                                id="userType"
                                                value={formData.userType}
                                                onChange={handleChange}
                                                options={userTypeOptions}
                                                required
                                            />

                                            <FormInput
                                                label="Subject"
                                                id="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="How can we help you?"
                                                required
                                                error={errors.subject}
                                            />

                                            <FormTextarea
                                                label="Your Message"
                                                id="message"
                                                value={formData.message}
                                                onChange={handleChange}
                                                placeholder="Tell us how we can assist you..."
                                                required
                                                rows={4}
                                                error={errors.message}
                                                maxLength={500}
                                            />

                                            <FormButton
                                                type="submit"
                                                variant="primary"
                                                size="lg"
                                                isLoading={isSubmitting}
                                                fullWidth
                                            >
                                                Send Message
                                            </FormButton>
                                        </FormGroup>
                                    </Form>
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