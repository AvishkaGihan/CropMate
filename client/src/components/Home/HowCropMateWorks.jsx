import React from 'react';
import SectionWrapper from '../SectionWrapper';

const steps = [
    {
        id: 1,
        number: "01",
        title: "Create Your Profile",
        description: "Sign up as a Farmer, Vendor, or Transporter and complete your profile",
        image: "/src/assets/images/create-profile.jpg",
    },
    {
        id: 2,
        number: "02",
        title: "Connect & Trade",
        description: "Browse listings, connect with partners, and make deals",
        image: "/src/assets/images/connect-trade.jpg",
    },
    {
        id: 3,
        number: "03",
        title: "Grow Together",
        description: "Expand your network and grow your agricultural business",
        image: "/src/assets/images/grow-together.jpg",
    },
];

const HowCropMateWorks = () => {
    return (
        <SectionWrapper>
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-green-700 mb-3">How CropMate Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step) => (
                    <div key={step.id} className="relative">
                        <div className="relative rounded-lg overflow-hidden mb-4">
                            <img
                                src={step.image}
                                alt={step.title}
                                className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-semibold text-sm">
                                {step.number}
                            </div>
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </SectionWrapper>
    );
};

export default HowCropMateWorks;