import { FEATURES } from "../../constants/features"

import BackgroundElements from "../../components/WhyChooseCropMate/BackgroundElements";
import SectionHeader from "../../components/WhyChooseCropMate/SectionHeader";
import FeatureCard from "../../components/WhyChooseCropMate/FeatureCard";
import CallToAction from "../../components/WhyChooseCropMate/CallToAction";
import SectionWrapper from "./SectionWrapper";

const WhyChooseCropMate = () => {
    return (
        <SectionWrapper className="bg-gradient-to-b from-cambridge-blue-50 to-cambridge-blue-100/30 py-24 relative overflow-hidden">
            <BackgroundElements />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
                <SectionHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {FEATURES.map((feature, index) => (
                        <FeatureCard
                            key={feature.id}
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            color={feature.color}
                            iconBg={feature.iconBg}
                            borderColor={feature.borderColor}
                            benefit={feature.benefit}
                            delay={index}
                        />
                    ))}
                </div>

                <CallToAction />
            </div>
        </SectionWrapper>
    );
};

export default WhyChooseCropMate;