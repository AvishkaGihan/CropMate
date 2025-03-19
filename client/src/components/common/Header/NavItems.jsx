import React from 'react';
import { Link } from 'react-router';
import { navItems } from '../../../constants/navItems';

const NavItems = () => {
    return (
        <nav>
            <ul className="flex space-x-6">
                {navItems.map((item) => (
                    <li key={item.id}>
                        <Link
                            to={item.path}
                            className="text-gray-700 hover:text-green-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default NavItems;