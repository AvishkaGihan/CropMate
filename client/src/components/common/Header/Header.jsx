import React, { useState } from 'react';
import { Link } from 'react-router';
import SearchBar from './SearchBar';
import NavItems from './NavItems';
import MobileMenu from './MobileMenu';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-white py-4 px-6 shadow-sm">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center">
                    <span className="text-green-700 text-xl font-bold mr-1">🌾</span>
                    <span className="text-green-700 text-xl font-bold">CropMate</span>
                </Link>

                <div className="hidden md:block flex-grow mx-10">
                    <SearchBar />
                </div>

                <div className="hidden md:flex items-center">
                    <NavItems />
                    <div className="ml-4 flex items-center">
                        <span className="text-gray-600">🛒</span>
                        <div className="ml-4 relative">
                            <button className="flex items-center focus:outline-none">
                                <span className="text-gray-700 font-medium">John Doe</span>
                                <span className="ml-1">▼</span>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="md:hidden">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-gray-700 focus:outline-none"
                    >
                        {isMenuOpen ? '✕' : '≡'}
                    </button>
                    {isMenuOpen && <MobileMenu />}
                </div>
            </div>
        </header>
    );
};

export default Header;