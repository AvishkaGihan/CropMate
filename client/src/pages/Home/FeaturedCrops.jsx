import { useElementVisibility } from '../../hooks/useElementVisibility';
import { Link } from 'react-router';

import { FEATURED_CROPS } from '../../constants/featuredProducts';
import SectionHeader from '../../components/SectionHeader';
import CropCard from '../../components/Crops/CropCard';
import SectionWrapper from './SectionWrapper';
import BackgroundDecorations from '../../components/FeaturedCrops/BackgroundDecoration';
import CTA from '../../components/FeaturedCrops/CTA';



const FeaturedCrops = () => {
    const [cardsContainerRef, isCardsVisible] = useElementVisibility({ threshold: 0.1 });
    const [ctaRef, isCtaVisible] = useElementVisibility({ threshold: 0.5 });

    return (
        <SectionWrapper className="bg-gradient-to-b from-cambridge-blue-200/40 via-mindaro-100/40 to-golden-brown-100/30 
            py-24 relative overflow-hidden">

            <BackgroundDecorations />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                {/* Section header */}
                <SectionHeader
                    badge="Fresh From Farms"
                    title="Featured"
                    special="Crops"
                    description="Explore high-quality crops from verified farmers across Sri Lanka.
                        All products are directly sourced from the best farms in the country."
                />

                {/* Crops grid */}
                <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative"
                    style={{ perspective: '1000px' }}
                >
                    {FEATURED_CROPS.map((crop, index) => (
                        <CropCard key={crop.id} crop={crop} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <CTA
                    ctaRef={ctaRef}
                    isCtaVisible={isCtaVisible}
                />
            </div>
        </SectionWrapper>
    );
};

export default FeaturedCrops;