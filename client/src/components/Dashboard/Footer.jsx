import React from 'react';
import { Link } from 'react-router';

const Footer = ({ role = 'farmer' }) => {
    // Role-specific styling
    const getRoleClasses = () => {
        switch (role) {
            case 'farmer':
                return 'text-cal-poly-green-600 hover:text-cal-poly-green-800';
            case 'driver':
                return 'text-cambridge-blue-600 hover:text-cambridge-blue-800';
            case 'vendor':
                return 'text-golden-brown-600 hover:text-golden-brown-800';
            default:
                return 'text-cal-poly-green-600 hover:text-cal-poly-green-800';
        }
    };

    const linkClass = getRoleClasses();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-gray-200 px-4 py-3 mt-auto">
            <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                <div className="mb-2 sm:mb-0">
                    <span>&copy; {currentYear} CropMate. All rights reserved.</span>
                </div>

                <div className="flex space-x-4">
                    <Link to="/terms" className={linkClass}>
                        Terms
                    </Link>
                    <Link to="/privacy" className={linkClass}>
                        Privacy
                    </Link>
                    <Link to="/support" className={linkClass}>
                        Support
                    </Link>
                    <span className="text-gray-500">v1.0.0</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;