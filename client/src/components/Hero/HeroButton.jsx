import { Link } from 'react-router';

const HeroButton = ({ to, primary = false, children }) => {
    const baseClasses = "rounded-lg font-medium transition-all duration-500 ease-in-out transform hover:-translate-y-1 active:translate-y-0";

    const primaryClasses = `group bg-golden-brown-400 text-white px-8 py-4 relative overflow-hidden 
        shadow-xl hover:shadow-golden-brown-400/40 ${baseClasses}`;

    const secondaryClasses = `group bg-transparent backdrop-blur-sm border border-cambridge-blue-300/40 
        text-white px-8 py-4 hover:bg-cambridge-blue-700/20 ${baseClasses}`;

    return (
        <Link to={to} className={primary ? primaryClasses : secondaryClasses}>
            {primary ? (
                <>
                    <span className="relative z-10">{children}</span>
                    <span className="absolute inset-0 bg-golden-brown-500 translate-y-full 
                        group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                </>
            ) : (
                <>
                    {children}
                    {typeof children === 'string' &&
                        <span className="inline-block ml-2 transform group-hover:translate-x-2 
                            transition-transform duration-500 ease-in-out">→</span>
                    }
                </>
            )}
        </Link>
    );
};

export default HeroButton; 