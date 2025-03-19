import React from 'react';
import { Link } from 'react-router';
import SectionWrapper from '../SectionWrapper';
import ServiceCard from './ServiceCard';

const featuredCrops = [
    {
        id: 1,
        title: "Premium Rice",
        image: "/src/assets/images/rice.jpg",
        rating: 4.8,
        location: "Kandy",
        farmType: "Anyalapitiya",
    },
    {
        id: 2,
        title: "Organic Vegetables",
        image: "/src/assets/images/vegetables.jpg",
        rating: 4.9,
        location: "Nuwara Eliya",
        farmType: "Demena Farm",
    },
    {
        id: 3,
        title: "Fresh Tea Leaves",
        image: "/src/assets/images/tea.jpg",
        rating: 4.7,
        location: "Ella",
        farmType: "Sandy",
    }
];

const FeaturedCrops = () => {
    return (
        <SectionWrapper>
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-700 mb-3">Featured Crops</h2>
                <p className="text-gray-600">
                    Explore high-quality crops from verified farmers across Sri Lanka
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {featuredCrops.map((crop) => (
                    <ServiceCard
                        key={crop.id}
                        title={crop.title}
                        image={crop.image}
                        rating={crop.rating}
                        location={crop.location}
                        farmType={crop.farmType}
                    />
                ))}
            </div>

            <div className="mt-10 text-center">
                <Link
                    to="/crops"
                    className="inline-flex items-center text-green-700 hover:text-green-800 transition-colors"
                >
                    View All Crops →
                </Link>
            </div>
        </SectionWrapper>
    );
};

export default FeaturedCrops;