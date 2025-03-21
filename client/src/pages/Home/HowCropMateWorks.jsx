import React from 'react';
import { motion } from 'framer-motion';

import { steps } from '../../constants/steps';
import SectionWrapper from './SectionWrapper';
import SectionHeader from '../../components/SectionHeader';
import BackgroundElements from '../../components/BackgroundElements';
import StepCard from '../../components/HowCropMateWorks/StepCard';
import CTA from '../../components/CTA'



// Animation variants
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut"
        }
    }
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1
        }
    }
};


const ctaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            delay: 0.3
        }
    }
};

const HowCropMateWorks = () => {
    return (
        <SectionWrapper
            className="py-24 relative overflow-hidden bg-cambridge-blue-50/70"
            withGlow
        >
            <BackgroundElements />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Section */}
                <motion.div variants={sectionVariants} className="max-w-3xl mx-auto">
                    <SectionHeader
                        badge="How It Works"
                        title="Simple"
                        special=" Process"
                        description="Join CropMate in three easy steps and transform how you connect with the agricultural ecosystem."
                    />
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-16 will-change-transform relative"
                    variants={containerVariants}
                >
                    {steps.map((step, index) => (
                        <StepCard step={step} index={index} />
                    ))}
                </motion.div>

                {/* Call to action */}
                <motion.div
                    className="text-center mt-20"
                    variants={ctaVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <div className="inline-flex flex-col items-center">
                        <CTA
                            href="/signup"
                            text="Get Started Today"
                            variant="primary"
                            size="md"
                        />

                        {/* Enhanced explanation with branded badge */}
                        <div className="mt-8">
                            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-cambridge-blue-100/50 backdrop-blur-sm mb-3 border border-cambridge-blue-200/30">
                                <span className="text-xs font-semibold text-cambridge-blue-700">
                                    Trusted by 5,000+ Agricultural Professionals in Sri Lanka
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
};

export default HowCropMateWorks;