import React from "react";

const FeatureCard = ({ icon, title, description, color, iconBg, borderColor, benefit }) => {
    return (
        <div
            className={`${color} backdrop-blur-sm p-7 rounded-2xl border ${borderColor} 
                shadow-lg hover:shadow-2xl
                group h-full flex flex-col relative overflow-hidden
                transition-all duration-300 hover:-translate-y-1`}
        >
            {/* Background decoration */}
            <div
                className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-sm
                    transition-transform duration-300 group-hover:scale-110"
            ></div>

            {/* Benefit tag */}
            {benefit && (
                <div className="absolute -right-1 -top-1">
                    <div
                        className="text-xs font-semibold px-2 py-1 rounded-lg 
                            shadow-sm bg-cambridge-blue-500/80 text-white
                            -rotate-3 transition-transform duration-300 group-hover:rotate-0"
                    >
                        {benefit}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div
                    className={`${iconBg} w-16 h-16 rounded-full mb-6 flex items-center justify-center
                        text-3xl shadow-inner transition-transform duration-300 group-hover:scale-110`}
                >
                    {icon}
                </div>

                {/* Title */}
                <h3
                    className="text-cambridge-blue-800 font-semibold text-xl mb-3
                        transition-colors duration-300 group-hover:text-cambridge-blue-600"
                >
                    {title}
                </h3>

                {/* Description */}
                <p className="text-cambridge-blue-700/90 flex-grow leading-relaxed">
                    {description}
                </p>

                {/* Learn more link */}
                <div className="mt-5 pt-5 border-t border-cambridge-blue-200/20">
                    <div className="overflow-hidden">
                        <span
                            className="text-golden-brown-600 text-sm flex items-center
                                opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300"
                        >
                            Learn more
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1 transition-transform duration-300 group-hover:translate-x-1.5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeatureCard;