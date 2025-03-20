import { Link } from "react-router";

const CTA = ({ ctaRef, isCtaVisible }) => {
    return (
        <div
            ref={ctaRef}
            className="mt-16 text-center relative"
            style={{
                opacity: isCtaVisible ? 1 : 0,
                transform: isCtaVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'opacity 600ms ease-out, transform 600ms ease-out',
            }}
        >
            {/* Decorative elements */}
            <div className="absolute -left-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
            transform -rotate-45 hidden md:block"></div>
            <div className="absolute -right-12 top-1/2 w-24 h-1 bg-golden-brown-400/20 rounded-full 
            transform rotate-45 hidden md:block"></div>

            <Link
                to="/crops"
                className="relative inline-flex items-center px-7 py-3.5 bg-gradient-to-r 
                from-golden-brown-500 to-golden-brown-600 text-white font-medium
                rounded-full shadow-md hover:shadow-lg transition-all duration-300
                hover:-translate-y-1 group overflow-hidden"
            >
                {/* Button shine effect */}
                <div className="absolute inset-0 w-0 bg-white/20 group-hover:w-full transition-all duration-300"></div>
                <div className="absolute -inset-1 rounded-full blur opacity-0 group-hover:opacity-15 
                transition-opacity duration-300 bg-white"></div>

                <span className="relative z-10">Browse All Crops</span>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="relative z-10 h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </Link>
        </div>
    )
}

export default CTA;