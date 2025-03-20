import { Link } from "react-router";

const Logo = () => {
    return (
        <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cal-poly-green-600 to-cambridge-blue-800 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:shadow-md group-hover:shadow-mindaro-400/20 group-hover:scale-110">
                <div className="relative flex items-center justify-center w-full h-full">
                    {/* Leaf shape with mindaro accent */}
                    <svg
                        viewBox="0 0 24 24"
                        className="w-5 h-5 fill-mindaro-400 transition-transform duration-500 group-hover:rotate-12"
                    >
                        <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-xl font-bold text-white group-hover:text-mindaro-300 transition-colors duration-300">
                    CropMate
                </span>
                <span className="text-xs text-cambridge-blue-300/80 -mt-1 transition-opacity duration-300 group-hover:opacity-100 opacity-80">
                    Agricultural Innovation
                </span>
            </div>
        </Link>
    );
};

export default Logo;