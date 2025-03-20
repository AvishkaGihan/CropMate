import { useElementVisibility } from "../hooks/useElementVisibility";

const SectionHeader = ({ badge, title, special, description }) => {
    const [headerRef, isHeaderVisible] = useElementVisibility({ threshold: 0.2 });

    return (
        <div
            ref={headerRef}
            className="text-center mb-16"
            style={{
                opacity: isHeaderVisible ? 1 : 0,
                transform: isHeaderVisible ? 'translateY(0)' : 'translateY(-20px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
            }}
        >
            {/* Section label */}
            <div className="inline-block px-3 py-1 rounded-full bg-golden-brown-400/10 mb-2">
                <span className="text-golden-brown-500 text-sm font-medium uppercase tracking-wider">
                    {badge}
                </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-cambridge-blue-800 mt-3 mb-5">
                {title} <span className="text-golden-brown-500 relative">
                    {special}
                </span>
            </h2>

            {/* Divider */}
            <div className="w-24 h-1 bg-golden-brown-400/30 mx-auto my-6 rounded-full"></div>

            <p className="text-cambridge-blue-700/80 max-w-2xl mx-auto text-lg leading-relaxed">
                {description}
            </p>
        </div>
    );
};

export default SectionHeader;