import React from 'react';
import { motion } from 'framer-motion';
import { FEATURES } from "../../constants/features"

import BackgroundElements from "../../components/BackgroundElements";
import SectionHeader from "../../components/SectionHeader";
import FeatureCard from "../../components/WhyChooseCropMate/FeatureCard";
import CTA from "../../components/CTA";
import SectionWrapper from "./SectionWrapper";


// Performance-optimized animations
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut"  // Simple easing function for better performance
        }
    }
};

// Minimal staggering for better performance
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,  // Reduced stagger time for better performance
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

// Simplified card animation - using a custom function that generates variants
// We use a function to avoid recreating objects for each item in the array
const getCardVariants = (index) => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            delay: index * 0.08  // Light delay between cards
        }
    }
});

const WhyChooseCropMate = () => {
    return (
        <SectionWrapper className="bg-gradient-to-b from-cambridge-blue-50 to-cambridge-blue-100/30 py-24 relative overflow-hidden">
            {/* Background elements */}
            <BackgroundElements />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}  // Only animate once for better performance
            >
                {/* Section Header */}
                <motion.div
                    variants={sectionVariants}
                >
                    <SectionHeader
                        badge="Why Choose Us"
                        title="The CropMate"
                        special=" Advantage"
                        description="Our platform offers innovative solutions designed specifically for everyone
                    in the agricultural ecosystem, from farmers to distributors."
                    />
                </motion.div>

                {/* Feature Cards Grid - using layout group for better performance */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.05 }}  // Trigger earlier
                >
                    {FEATURES.map((feature, index) => (
                        <motion.div
                            key={feature.id}
                            className="will-change-transform"  // Performance hint for the browser
                            variants={getCardVariants(index)}
                        >
                            <FeatureCard
                                icon={feature.icon}
                                title={feature.title}
                                description={feature.description}
                                color={feature.color}
                                iconBg={feature.iconBg}
                                borderColor={feature.borderColor}
                                benefit={feature.benefit}
                            />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-20"
                    variants={ctaVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.8 }}
                >
                    <div className="inline-flex flex-col items-center">
                        <CTA
                            href="/about"
                            text="Learn More"
                            variant="primary"
                            size="md"
                        />
                    </div>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
};

export default WhyChooseCropMate;