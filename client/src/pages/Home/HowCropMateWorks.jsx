import { useMemo } from 'react';
import { motion } from 'framer-motion';

import { steps } from '../../constants/steps';
import SectionWrapper from './SectionWrapper';
import SectionHeader from '../../components/Shared/SectionHeader';
import BackgroundElements from '../../components/Shared/BackgroundElements';
import StepCard from '../../components/HowCropMateWorks/StepCard';
import CTA from '../../components/Shared/CTA'



// Animation variants
const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

// Simplified container variants with reduced staggering
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15, // Increased time between items
            delayChildren: 0.05
        }
    }
};

const ctaVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
            delay: 0.2
        }
    }
};

const HowCropMateWorks = () => {

    // Memoize step cards to prevent unnecessary re-renders
    const stepCards = useMemo(() => (
        steps.map((step, index) => (
            <StepCard step={step} key={index} />
        ))
    ))

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
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 mt-16 will-change-transform relative"
                    variants={containerVariants}
                >
                    {stepCards}
                </div>

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
                    </div>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
};

export default HowCropMateWorks;