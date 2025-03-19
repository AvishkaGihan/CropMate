import React from 'react';
import { Link } from 'react-router';
import { legalLinks } from '../../../constants/legalLinks';

const LegalLinks = () => {
    return (
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 md:mt-0">
            {legalLinks.map((link) => (
                <Link
                    key={link.id}
                    to={link.path}
                    className="text-sm text-gray-500 hover:text-green-600 transition-colors"
                >
                    {link.label}
                </Link>
            ))}
        </div>
    );
};

export default LegalLinks;