import { memo, useMemo } from 'react';
import { motion } from 'framer-motion';

import { featuredCrops } from '../../constants';
import SectionHeader from '../../components/Shared/SectionHeader';
import CropCard from '../../components/Crops/CropCard';
import SectionWrapper from '../../components/Shared/SectionWrapper';
import CTA from '../../components/Shared/CTA';
import { Leaf } from 'lucide-react';

import { containerVariants, ctaVariants } from '../../util/animations';

const FeaturedCrops = () => {
    const cropCards = useMemo(() =>
        featuredCrops.slice(0, 3).map((crop, index) => (
            <div key={crop.id} className="will-change-transform">
                <CropCard crop={crop} />
            </div>
        )),
        []);

    return (
        <SectionWrapper className="bg-gradient-to-b from-cambridge-blue-200/40 via-mindaro-100/40 to-golden-brown-100/30 
        py-24 relative overflow-hidden">

            {/* Leaf decorations */}
            <div className="absolute top-40 left-10 w-16 h-16 text-cambridge-blue-500/10 transform rotate-45">
                <Leaf size={120} className="w-full h-full" />
            </div>

            <div className="absolute bottom-40 right-10 w-20 h-20 text-golden-brown-500/10 transform -rotate-12">
                <Leaf size={120} className="w-full h-full" />
            </div>

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

                        <CTA
                            href="/marketplace"
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