import React, { lazy, Suspense } from 'react';
import HeroSection from './HeroSection'; // Keep the hero section immediate

// Lazy load other sections
const WhyChooseCropMate = lazy(() => import('./WhyChooseCropMate'));
const FeaturedCrops = lazy(() => import('./FeaturedCrops'));
const HowCropMateWorks = lazy(() => import('./HowCropMateWorks'));

// Simple loading component
const SectionLoading = () => (
    <div className="min-h-[200px] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-cambridge-blue-200 border-t-cambridge-blue-600 rounded-full animate-spin"></div>
    </div>
);

const HomePage = () => {
    return (
        <>
            <HeroSection />

            <Suspense fallback={<SectionLoading />}>
                <WhyChooseCropMate />
            </Suspense>

            <Suspense fallback={<SectionLoading />}>
                <FeaturedCrops />
            </Suspense>

            <Suspense fallback={<SectionLoading />}>
                <HowCropMateWorks />
            </Suspense>
        </>
    );
};

export default HomePage;