import { Link, useLocation } from "react-router";

const NavLinks = ({ isMobile = false }) => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    const linkClass = (path) =>
        `font-medium transition-colors duration-300 ${isActive(path)
            ? "text-mindaro-400" // Change active color to mindaro
            : isMobile
                ? "text-cambridge-blue-300 border-b border-cambridge-blue-700/20 pb-2" // Updated mobile link colors
                : "text-white hover:text-mindaro-300" // Desktop hover color to mindaro
        }`;

    return (
        <div
            className={
                isMobile
                    ? "flex flex-col space-y-4"
                    : "hidden lg:flex items-center gap-8"
            }
        >
            <Link to="/" className={linkClass("/")}>
                Home
            </Link>
            <Link to="/services" className={linkClass("/services")}>
                Services
            </Link>
            <Link to="/about" className={linkClass("/about")}>
                About
            </Link>
            <Link to="/contact-us" className={linkClass("/contact-us")}>
                Contact Us
            </Link>
        </div>
    );
};

export default NavLinks;