import { useState, useEffect } from "react";
import { useElementVisibility } from "../../hooks/useElementVisibility";
import StarRating from "./StarRating";

const CropCard = ({ crop, index, onHover }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cardRef, isVisible] = useElementVisibility({
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Let parent component know when card is hovered (for coordinated animations)
    useEffect(() => {
        if (onHover && typeof onHover === 'function') {
            onHover(isHovered, index);
        }
    }, [isHovered, index, onHover]);

    return (
        <div
            ref={cardRef}
            className={`bg-white/95 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg 
                overflow-hidden group relative border border-cambridge-blue-100/30 h-full flex flex-col
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
                transitionDelay: `${index * 80}ms`,
                transitionProperty: 'transform, opacity, box-shadow',
                transitionDuration: '400ms',
                transitionTimingFunction: 'ease-out',
                transform: isHovered ? 'translateY(-2px)' : 'translateY(0)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Badge - simplified */}
            {crop.badge && (
                <div className="absolute top-3 left-3 z-10">
                    <div
                        className="bg-golden-brown-500 text-white text-xs px-2 py-1 rounded-md shadow-sm font-medium -rotate-2"
                    >
                        {crop.badge}
                    </div>
                </div>
            )}

            {/* Image container - kept important zoom animation */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={crop.image}
                    alt={crop.title}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />

                {/* Single gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/10"></div>

                {/* Location and rating - simplified */}
                <div className="absolute bottom-0 left-0 w-full p-3 text-white flex justify-between items-center">
                    <div className="flex items-center">
                        <svg className="w-4 h-4 mr-1 text-mindaro-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">{crop.location}</span>
                    </div>
                    <StarRating rating={crop.rating} />
                </div>
            </div>

            {/* Content - simplified animations */}
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-semibold mb-1 text-cambridge-blue-800 group-hover:text-golden-brown-600 transition-colors duration-200">
                    {crop.title}
                </h3>

                <div className="flex justify-between items-center mb-3">
                    <span className="text-sm text-cambridge-blue-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-cambridge-blue-400"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4z" />
                        </svg>
                        {crop.farmType}
                    </span>
                    <span className="font-medium text-cal-poly-green-600 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1 text-cal-poly-green-500"
                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {crop.price}
                    </span>
                </div>

                <div className="mt-auto pt-4 border-t border-cambridge-blue-100/30">
                    <button
                        className="w-full py-2.5 rounded-lg border border-cambridge-blue-400 text-cambridge-blue-600
        flex items-center justify-center relative overflow-hidden
        group-hover:bg-cambridge-blue-600 group-hover:text-white group-hover:border-cambridge-blue-600
        hover:shadow-md transition-all duration-300"
                    >
                        <span className="relative z-10">View Details</span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 ml-2 relative z-10 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CropCard;