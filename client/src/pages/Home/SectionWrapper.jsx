import React from 'react';

const SectionWrapper = ({ children, className = '', bgColor = 'bg-white' }) => {
    return (
        <section className={`py-16 ${bgColor} ${className}`}>
            <div className="container mx-auto px-6">
                {children}
            </div>
        </section>
    );
};

export default SectionWrapper;