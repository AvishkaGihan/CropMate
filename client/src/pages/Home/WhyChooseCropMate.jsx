import React from 'react';
import SectionWrapper from './SectionWrapper';

const features = [
    {
        id: 1,
        icon: "🌱",
        title: "Smart Farming",
        description: "Access real-time market prices and make informed decisions about your crops"
    },
    {
        id: 2,
        icon: "🤝",
        title: "Direct Trading",
        description: "Connect directly with buyers and sellers, eliminating middlemen"
    },
    {
        id: 3,
        icon: "🚚",
        title: "Seamless Logistics",
        description: "Efficient transportation solutions for your agricultural products"
    },
    {
        id: 4,
        icon: "📊",
        title: "Market Insights",
        description: "Data-driven insights to optimize your farming operations"
    }
];

const FeatureCard = ({ icon, title, description }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <div className="text-3xl mb-4">{icon}</div>
            <h3 className="text-green-700 font-semibold text-lg mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
        </div>
    );
};

const WhyChooseCropMate = () => {
    return (
        <SectionWrapper>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-700 mb-3">Why Choose CropMate?</h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Our platform offers comprehensive solutions for everyone in the agricultural ecosystem
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.map((feature) => (
                    <FeatureCard
                        key={feature.id}
                        icon={feature.icon}
                        title={feature.title}
                        description={feature.description}
                    />
                ))}
            </div>
        </SectionWrapper>
    );
};

export default WhyChooseCropMate;