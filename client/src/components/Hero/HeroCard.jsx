import React from 'react';

const HeroCard = ({
    image,
    tag = "Featured",
    title = "Sustainable Farming Practices",
    description = "Discover how modern techniques are transforming agriculture",
    isLoaded = true
}) => {
    return (
        <div className={`w-full lg:flex-1 lg:max-w-2xl relative order-first lg:order-last
            mx-auto lg:mx-0 mt-16 lg:mt-0
            transition-all duration-1000 delay-300 ease-out 
            ${isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>

            {/* Card Glow Effect */}
            <div className="absolute inset-0 rounded-2xl bg-mindaro-400/15 
                blur-md -m-2 animate-pulse-slow"></div>

            {/* Card Container */}
            <div className="relative bg-gradient-to-br from-mindaro-400/10 
                to-cambridge-blue-400/10 backdrop-blur-sm 
                rounded-2xl
                overflow-hidden shadow-2xl animate-float border-[4px] 
                border-mindaro-400/15 hover:border-mindaro-400/25 
                transition-all duration-500 ease-in-out transform 
                hover:-translate-y-1 hover:shadow-xl">

                {/* Card Image */}
                <div className="rounded-xl overflow-hidden">
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-auto object-cover 
                            transition-transform duration-700 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t 
                        from-cal-poly-green-900/80 via-cal-poly-green-900/40 
                        to-transparent rounded-xl"></div>
                </div>

                {/* Card Content */}
                <div className="absolute bottom-0 left-0 p-8">
                    <div className="inline-block px-4 py-1.5 bg-golden-brown-400/90 
                        text-white text-sm font-medium rounded-full mb-3 shadow-lg 
                        transform hover:scale-105 transition-transform duration-300">
                        {tag}
                    </div>

                    <h3 className="text-white text-2xl font-bold drop-shadow-lg 
                        transform transition-all duration-300 hover:translate-x-1">
                        {title}
                    </h3>

                    <p className="text-white/90 mt-2 max-w-md 
                        transition-all duration-300 ease-in-out">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;