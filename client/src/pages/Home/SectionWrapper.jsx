import React from 'react';

const SectionWrapper = ({
    children,
    className = '',
    bgColor = 'bg-cambridge-blue-50',
    withPattern = false,
    withGlow = false,
    spacing = 'py-16'
}) => {
    return (
        <section className={`${spacing} ${bgColor} ${className} relative overflow-hidden`}>
            {/* Optional decorative background pattern */}
            {withPattern && (
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cambridge-blue-400/50 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cambridge-blue-400/50 to-transparent"></div>
                    <div className="grid grid-cols-12 h-full max-w-screen-xl mx-auto">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="border-l border-cambridge-blue-400/10 h-full"></div>
                        ))}
                    </div>
                </div>
            )}

            {/* Optional decorative glow elements */}
            {withGlow && (
                <>
                    <div className="absolute top-20 right-1/4 w-64 h-64 bg-mindaro-400/10 rounded-full blur-3xl -z-10"></div>
                    <div className="absolute bottom-10 left-1/3 w-72 h-72 bg-golden-brown-400/10 rounded-full blur-3xl -z-10"></div>
                </>
            )}

            <div className="container mx-auto px-4 sm:px-6 relative z-10">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;