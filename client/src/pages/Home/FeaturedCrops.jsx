import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

import { FEATURED_CROPS } from '../../constants/featuredProducts';
import SectionHeader from '../../components/SectionHeader';
import CropCard from '../../components/Crops/CropCard';
import SectionWrapper from './SectionWrapper';
import BackgroundDecorations from '../../components/FeaturedCrops/BackgroundDecoration';
import CTA from '../../components/CTA';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,  // Light stagger for better performance
            delayChildren: 0.1
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: "easeOut",
            delay: i * 0.07  // Reduced delay between cards
        }
    })
};

const ctaVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: "easeOut",
            delay: 0.2
        }
    }
};

const FeaturedCrops = () => {
    const cropCards = useMemo(() =>
        FEATURED_CROPS.slice(0, 3).map((crop, index) => (
            <div key={crop.id} className="will-change-transform">
                <CropCard crop={crop} />
            </div>
        )),
        []);

    return (
        <SectionWrapper className="bg-gradient-to-b from-cambridge-blue-200/40 via-mindaro-100/40 to-golden-brown-100/30 
        py-24 relative overflow-hidden">

            <BackgroundDecorations />

            <motion.div
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
            >
                {/* Section header */}
                <motion.div variants={containerVariants}>
                    <SectionHeader
                        badge="Fresh From Farms"
                        title="Featured"
                        special="Crops"
                        description="Explore high-quality crops from verified farmers across Sri Lanka.
                All products are directly sourced from the best farms in the country."
                    />
                </motion.div>

                {/* Crops grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative will-change-transform"
                    style={{ perspective: '1000px' }}
                    variants={containerVariants}
                >
                    {cropCards}
                </motion.div>

                {/* CTA */}
                <motion.div
                    variants={ctaVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                >
                    <div className="mt-16 text-center relative">
                        {/* Decorative elements */}
                        <div className="absolute -left-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
                transform -rotate-45 hidden md:block"></div>
                        <div className="absolute -right-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
                transform rotate-45 hidden md:block"></div>

                        <CTA
                            href="/crops"
                            text="Browse All Crops"
                            variant="secondary"
                            withShine={true}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </SectionWrapper>
    );
};

export default memo(FeaturedCrops);