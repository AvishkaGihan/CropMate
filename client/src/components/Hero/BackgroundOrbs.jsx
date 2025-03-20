import React from 'react'

const BackgroundOrbs = () => (
    <>
        <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-mindaro-500/15 
            rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-32 -left-16 w-64 h-64 bg-persian-orange-500/10 
            rounded-full blur-3xl animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/4 right-1/3 w-32 h-32 bg-golden-brown-400/10 
            rounded-full blur-xl animate-pulse-slow animation-delay-1000"></div>
    </>
);

export default BackgroundOrbs;