import React from 'react';
import { Link } from 'react-router'

const HeroSection = () => {
    return (
        <section className="relative bg-gradient-to-br from-green-800 to-green-600 text-white py-24">
            <div className="absolute inset-0">
                <img
                    src="/src/assets/images/hero-bg.jpg"
                    alt="Agricultural field"
                    className="w-full h-full object-cover mix-blend-multiply"
                />
            </div>
            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-xl">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Cultivating Connections in Agriculture
                    </h1>
                    <p className="text-lg mb-8">
                        CropMate bridges the gap between farmers, vendors, and transporters. Experience
                        seamless agricultural commerce with real-time market insights.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <Link
                            to="/signup"
                            className="bg-white text-green-700 px-6 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/about"
                            className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:bg-opacity-10 transition-colors"
                        >
                            Learn More →
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;