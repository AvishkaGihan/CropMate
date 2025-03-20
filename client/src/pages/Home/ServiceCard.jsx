import React from 'react';
import { Link } from 'react-router';

const ServiceCard = ({ title, image, rating, location, farmType }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
            <div className="relative h-48">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 text-white py-1 px-2 rounded text-sm font-medium flex items-center">
                    <span>⭐</span>
                    <span className="ml-1">{rating}</span>
                </div>
            </div>
            <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <div className="flex items-center text-sm text-gray-600 mb-3">
                    <div className="flex items-center mr-4">
                        <span className="mr-1">📍</span>
                        <span>{location}</span>
                    </div>
                    <div className="flex items-center">
                        <span className="mr-1">🚜</span>
                        <span>{farmType}</span>
                    </div>
                </div>
                <Link
                    to={`/crops/${title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block w-full text-center py-2 border border-green-600 text-green-600 rounded hover:bg-green-600 hover:text-white transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;