import React from 'react';
import { motion } from 'framer-motion';

import SectionHeader from "../../components/Shared/SectionHeader";
import FeatureCard from "../../components/WhyChooseCropMate/FeatureCard";
import CTA from "../../components/Shared/CTA";
import SectionWrapper from "../../components/Shared/SectionWrapper";

import { containerVariants, ctaVariants, sectionVariants, getCardVariants } from "../../util/animations";
import { features } from '../../constants';

const WhyChooseCropMate = () => {
    return (
        <SectionWrapper className="py-24 relative overflow-hidden">
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
                    {features.map((feature, index) => (
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