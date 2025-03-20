import { useElementVisibility } from '../../hooks/useElementVisibility';

const CallToAction = () => {
    const [ctaRef, isCtaVisible] = useElementVisibility({ threshold: 0.3 });

    return (
        <div
            ref={ctaRef}
            className="mt-16 text-center"
            style={{
                opacity: isCtaVisible ? 1 : 0,
                transform: isCtaVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 500ms ease-out, transform 500ms ease-out',
            }}
        >
            <a
                href="#"
                className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r 
                    from-cambridge-blue-500 to-cambridge-blue-600 text-white 
                    rounded-full shadow-lg hover:shadow-xl will-change-transform
                    transform hover:-translate-y-1 hover:scale-[1.03] overflow-hidden group"
                style={{
                    transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
                }}
            >
                {/* Button shine effect */}
                <div className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300"></div>

                <span className="relative z-10">Explore All Features</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </a>
        </div>
    );
};

export default CallToAction;