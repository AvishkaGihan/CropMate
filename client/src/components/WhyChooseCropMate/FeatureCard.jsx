import { useState } from "react";
import { useElementVisibility } from "../../hooks/useElementVisibility";

const FeatureCard = ({ icon, title, description, color, iconBg, borderColor, benefit, delay = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [cardRef, isVisible] = useElementVisibility({
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    return (
        <div
            ref={cardRef}
            className={`${color} backdrop-blur-sm p-7 rounded-2xl border ${borderColor} 
                shadow-lg hover:shadow-2xl will-change-transform
                group h-full flex flex-col relative overflow-hidden
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{
                transitionProperty: 'transform, opacity, box-shadow',
                transitionDuration: '500ms',
                transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${delay * 50}ms`,
                transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                backfaceVisibility: 'hidden'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Background decoration */}
            <div className="absolute -right-16 -top-16 w-32 h-32 bg-white/5 rounded-full blur-sm
                transform group-hover:scale-110 transition-transform"></div>

            {/* Benefit tag */}
            {benefit && (
                <div className="absolute -right-1 -top-1">
                    <div className="text-xs font-semibold px-2 py-1 rounded-lg 
                        shadow-sm bg-cambridge-blue-500/80 text-white
                        transform -rotate-3 group-hover:rotate-0 transition-transform">
                        {benefit}
                    </div>
                </div>
            )}

            <div className="relative z-10 flex flex-col h-full">
                {/* Icon */}
                <div className={`${iconBg} w-16 h-16 rounded-full mb-6 flex items-center justify-center
                    text-3xl shadow-inner group-hover:scale-110 transition-transform`}>
                    {icon}
                </div>

                {/* Title */}
                <h3 className="text-cambridge-blue-800 font-semibold text-xl mb-3 group-hover:text-cambridge-blue-600 
                    transition-colors">
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
                            className={`text-golden-brown-600 text-sm flex items-center
                                transition-all ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                                transform: isHovered ? 'translateY(0)' : 'translateY(20px)',
                                transitionProperty: 'transform, opacity',
                                transitionDuration: '300ms'
                            }}
                        >
                            Learn more
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 ml-1"
                                style={{
                                    transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
                                    transitionProperty: 'transform',
                                    transitionDuration: '300ms'
                                }}
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

export default FeatureCard