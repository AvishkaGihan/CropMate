import React, { memo } from 'react';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import { navItems } from '../../constants/navItems';

const FooterLinks = () => {
    // Filter navItems to only include main navigation links (excluding dropdown items)
    const mainLinks = navItems.filter(item => !item.parent);

    return (
        <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
                <span className="w-6 h-6 bg-cambridge-blue-700 rounded-md flex items-center justify-center mr-2">
                    <ChevronRight size={16} className="text-mindaro-400" />
                </span>
                Quick Links
            </h3>

            <ul className="space-y-3">
                {mainLinks.map((link, index) => (
                    <li key={link.id || index}>
                        <Link to={link.path} className="text-cambridge-blue-300 hover:text-mindaro-400 flex items-center group">
                            <ChevronRight size={14} className="mr-2 text-cambridge-blue-500 group-hover:text-mindaro-400 transition-colors" />
                            <span>{link.label}</span>
                        </Link>
                    </li>
                ))}

                {/* Add auth links that might not be in the navItems */}
                <li>
                    <Link to="/sign-in" className="text-cambridge-blue-300 hover:text-mindaro-400 flex items-center group">
                        <ChevronRight size={14} className="mr-2 text-cambridge-blue-500 group-hover:text-mindaro-400 transition-colors" />
                        <span>Login</span>
                    </Link>
                </li>
                <li>
                    <Link to="/signup" className="text-cambridge-blue-300 hover:text-mindaro-400 flex items-center group">
                        <ChevronRight size={14} className="mr-2 text-cambridge-blue-500 group-hover:text-mindaro-400 transition-colors" />
                        <span>Sign Up</span>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default memo(FooterLinks);