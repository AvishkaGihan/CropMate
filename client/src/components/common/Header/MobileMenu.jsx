import React from 'react';
import { Link } from 'react-router';
import { navItems } from '../../../constants/navItems';
import SearchBar from './SearchBar';

const MobileMenu = () => {
    return (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 z-50">
            <div className="mb-4">
                <SearchBar />
            </div>
            <ul className="space-y-3">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.path}
                            className="block py-2 text-gray-700 hover:text-green-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
                <li>
                    <Link to="/profile" className="block py-2 text-gray-700 hover:text-green-600">
                        John Doe
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default MobileMenu;