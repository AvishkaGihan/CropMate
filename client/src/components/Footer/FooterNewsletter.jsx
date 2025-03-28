import React, { memo, useState, useCallback } from 'react';

const FooterNewsletter = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState(null);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !email.includes('@')) {
            setMessage({ type: 'error', text: 'Please enter a valid email address.' });
            return;
        }

        // Simulate form submission
        setIsSubmitting(true);

        // In a real app, you'd call an API here
        setTimeout(() => {
            setIsSubmitting(false);
            setMessage({ type: 'success', text: 'Thank you for subscribing!' });
            setEmail('');

            // Clear success message after 3 seconds
            setTimeout(() => setMessage(null), 3000);
        }, 1000);
    }, [email]);

    return (
        <div className="relative bg-cambridge-blue-800 py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto bg-gradient-to-r from-cambridge-blue-700 to-cal-poly-green-500 rounded-xl p-1">
                    <div className="bg-cambridge-blue-800 rounded-lg p-8 md:p-10 relative overflow-hidden">
                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-mindaro-400/10 to-transparent rounded-full blur-3xl"></div>

                        <div className="relative">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div className="md:max-w-md">
                                    <h3 className="text-2xl font-bold text-white mb-2">Join Our Newsletter</h3>
                                    <p className="text-cambridge-blue-100">Get agricultural tips and updates delivered straight to your inbox.</p>
                                </div>

                                <div className="w-full md:w-auto">
                                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                                        <div className="flex-1">
                                            <input
                                                type="email"
                                                placeholder="Your email address"
                                                className="w-full px-4 py-3 rounded-lg bg-cambridge-blue-700/50 border border-cambridge-blue-600 text-white placeholder-cambridge-blue-300/70 focus:outline-none focus:ring-2 focus:ring-mindaro-400/50"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                disabled={isSubmitting}
                                            />
                                            {message && (
                                                <div className={`text-xs mt-1 ${message.type === 'error' ? 'text-red-300' : 'text-green-300'}`}>
                                                    {message.text}
                                                </div>
                                            )}
                                        </div>
                                        <button
                                            type="submit"
                                            className={`bg-golden-brown-500 hover:bg-golden-brown-600 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default memo(FooterNewsletter);