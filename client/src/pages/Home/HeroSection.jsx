import React, { useEffect, useState } from 'react';

import BackgroundOrbs from '../../components/Hero/BackgroundOrbs';
import TextureOverlay from '../../components/Hero/TextureOverlay';
import HeroButton from '../../components/Hero/HeroButton';
import HeroCard from '../../components/Hero/HeroCard';

import HeroImage from '../../assets/images/hero-image.webp';

const HeroSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setIsLoaded(true);
    }, []);

    // Animation classes that depend on isLoaded state
    const fadeInClasses = (delay = 0) => `
        transition-all duration-700 ease-out
        ${delay ? `delay-${delay}` : ''}
        ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
    `;

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden 
            bg-gradient-to-br from-cambridge-blue-900 via-cambridge-blue-800 
            to-cal-poly-green-600 py-16">

            {/* Background Elements */}
            <BackgroundOrbs />
            <TextureOverlay />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Content Column - Order last on mobile, first on desktop */}
                    <div className="flex-1 order-last lg:order-first">
                        {/* Subtitle */}
                        <div className={`hidden md:flex items-center space-x-3 mb-6 ${fadeInClasses()}`}>
                            <div className="w-10 h-[2px] bg-mindaro-400"></div>
                            <span className="text-sm font-medium text-mindaro-300 uppercase tracking-wider">
                                Agricultural Innovation
                            </span>
                        </div>

                        {/* Main Heading */}
                        <h1 className={`text-5xl md:text-6xl font-bold mb-8 text-white 
                            leading-tight ${fadeInClasses(100)}`}>
                            Cultivating <span className="text-mindaro-400 relative group">
                                Connections
                                <span className="absolute bottom-1 left-0 w-full h-1 
                                    bg-mindaro-400/30 group-hover:bg-mindaro-400/50 
                                    transition-colors duration-300"></span>
                            </span> in Agriculture
                        </h1>

                        {/* Description */}
                        <p className={`text-xl mb-12 text-gray-100/90 leading-relaxed 
                            max-w-xl ${fadeInClasses(200)}`}>
                            CropMate bridges the gap between farmers, vendors, and transporters with
                            real-time market insights and seamless connections.
                        </p>

                        {/* Call to Action Buttons */}
                        <div className={`flex flex-wrap gap-5 ${fadeInClasses(300)}`}>
                            <HeroButton to="/signup" primary>
                                Get Started
                            </HeroButton>
                            <HeroButton to="/about">
                                Learn More
                            </HeroButton>
                        </div>
                    </div>

                    {/* Hero Card Component */}
                    <HeroCard
                        image={HeroImage}
                        tag="Featured"
                        title="Sustainable Farming Practices"
                        description="Discover how modern techniques are transforming agriculture"
                        isLoaded={isLoaded}
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;