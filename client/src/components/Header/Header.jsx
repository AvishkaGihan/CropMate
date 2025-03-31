import { useState } from "react";
import { Link } from "react-router";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import SearchBar from "./SearchBar";
import MobileMenu from "./MobileMenu";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { userInfo, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 w-full z-50 bg-transparent backdrop-blur-sm">
      {/* Navigation Section */}
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <NavLinks />
          <SearchBar variant="dark" />
          <div className="flex items-center gap-3">
            {isAuthenticated && userInfo ? (
              <Link
                to="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md border border-cambridge-blue-300/40 text-white hover:bg-cambridge-blue-700/20 transform hover:-translate-y-0.5"
              >
                <span className="text-sm font-medium">{userInfo.name}</span>
                <span className="text-xs text-cambridge-blue-200 capitalize">
                  ({userInfo.role})
                </span>
              </Link>
            ) : (
              <>
                <Link
                  to="/sign-in"
                  className="px-4 py-2 rounded-lg transition-all duration-300 hover:shadow-md border border-cambridge-blue-300/40 text-white hover:bg-cambridge-blue-700/20 transform hover:-translate-y-0.5"
                >
                  Log In
                </Link>
                <Link
                  to="/signup"
                  className="group px-4 py-2 bg-golden-brown-400 text-white rounded-lg transition-all duration-500 hover:shadow-golden-brown-400/40 transform hover:-translate-y-0.5 relative overflow-hidden"
                >
                  <span className="relative z-10">Sign Up</span>
                  <span className="absolute inset-0 bg-golden-brown-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></span>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          <div className="flex flex-col items-end gap-1.5">
            <span
              className={`block h-0.5 w-6 bg-mindaro-400 rounded transition-all duration-300 ${
                isMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-4 bg-mindaro-400 rounded transition-all duration-300 ${
                isMenuOpen ? "w-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-6 bg-mindaro-400 rounded transition-all duration-300 ${
                isMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      <MobileMenu isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
    </header>
  );
};

export default Header;
