import { Link } from "react-router";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";

const MobileMenu = ({ isMenuOpen, setIsMenuOpen }) => {
    return (
        <div
            className={`lg:hidden bg-cambridge-blue-900/95 backdrop-blur-md shadow-lg transition-all duration-300 ease-in-out overflow-hidden ${isMenuOpen
                ? "max-h-screen opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-full"
                }`}
            role="menu"
            aria-expanded={isMenuOpen}
        >
            <div className="container mx-auto px-4 py-4 space-y-4">
                {/* Search Bar */}
                <SearchBar variant="dark" className="w-full" />

                {/* Navigation Links */}
                <NavLinks isMobile />

                {/* Authentication Links */}
                <div className="flex flex-col gap-3 mt-4">
                    <Link
                        to="/login"
                        className="py-2.5 text-center border border-cambridge-blue-300/40 text-white rounded-lg hover:bg-cambridge-blue-700/30 transition-all duration-300"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Log In
                    </Link>
                    <Link
                        to="/signup"
                        className="relative py-2.5 text-center bg-golden-brown-400 text-white rounded-lg overflow-hidden group"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <span className="relative z-10">Sign Up</span>
                        <span className="absolute inset-0 bg-golden-brown-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;