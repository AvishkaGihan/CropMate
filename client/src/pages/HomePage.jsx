import React from 'react';
import HeroSection from '../components/Home/HeroSection';
import WhyChooseCropMate from '../components/Home/WhyChooseCropMate';
import FeaturedCrops from '../components/Home/FeaturedCrops';
import HowCropMateWorks from '../components/Home/HowCropMateWorks';
import CTASection from '../components/Home/CTASection';

const HomePage = () => {
    return (
        <>
            <HeroSection />
            <WhyChooseCropMate />
            <FeaturedCrops />
            <HowCropMateWorks />
            <CTASection />
        </>
    );
};

export default HomePage;