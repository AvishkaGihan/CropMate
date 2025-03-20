const BackgroundDecoration = () => (
    <>
        {/* Background shapes */}
        <div className="absolute top-20 -right-10 w-80 h-80 bg-golden-brown-400/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-20 w-96 h-96 bg-mindaro-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-persian-orange-400/5 rounded-full blur-3xl"></div>

        {/* Leaf decorations */}
        <div className="absolute top-40 left-10 w-16 h-16 text-cambridge-blue-500/10 transform rotate-45">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17.5,12C13.8,8.3 10,9 10,9s0.7,-3.8 -3,-7.5c-1,4 -0.7,6.3 -0.5,7.5c-2,-0.7 -5,-0.5 -7.5,0.5c3.7,3.7 7.5,3 7.5,3s-0.7,3.8 3,7.5c0.7,-2 0.8,-8.5 0.5,-8.5c2,0.1 3.9,-0.2 7.5,-1.5m-6,4.9c-0.2,0.8 -0.5,1.6 -0.9,2.2c-2,-2 -1.8,-4.3 -1.8,-4.3s-2.3,0.2 -4.3,-1.8c0.6,-0.4 1.4,-0.7 2.2,-0.9c0.8,0.2 1.6,0.5 2.1,0.9c-0.4,-0.5 -0.7,-1.3 -0.9,-2.1c0.2,-0.8 0.5,-1.6 0.9,-2.2c2,2 1.9,4.3 1.9,4.3s2.2,-0.1 4.2,1.9c-0.6,0.4 -1.4,0.7 -2.2,0.9c-0.8,-0.2 -1.6,-0.5 -2.1,-0.9c0.4,0.5 0.7,1.3 0.9,2m11.7,-1.9l-0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9l0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9m-1.8,-6l-0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9l0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9m-13.2,12l-0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9l0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9m-1.8,-6l-0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9l0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9m13.2,0l-0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9l0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9m-1.8,-6l-0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9l0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9m-5.4,12l-0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9l0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9m-1.8,-6l-0.9,-3c0.6,0.3 1.2,0.6 1.8,0.9l0.9,3c-0.6,-0.3 -1.2,-0.6 -1.8,-0.9" />
            </svg>
        </div>

        <div className="absolute bottom-40 right-10 w-20 h-20 text-golden-brown-500/10 transform -rotate-12">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
            </svg>
        </div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </>
);

export default BackgroundDecoration;