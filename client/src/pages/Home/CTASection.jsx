import React from 'react';
import { Link } from 'react-router';

const CTASection = () => {
    return (
        <section className="bg-green-700 py-16 text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Agricultural Business?</h2>
                <p className="max-w-2xl mx-auto mb-8">
                    Join thousands of farmers, vendors, and transporters who are already
                    benefiting from CropMate's ecosystem.
                </p>
                <Link
                    to="/signup"
                    className="inline-block bg-white text-green-700 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
                >
                    Get Started Now
                </Link>
            </div>
        </section>
    );
};

export default CTASection;