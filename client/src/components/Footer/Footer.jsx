import React, { memo } from 'react';
import { Link } from 'react-router'; // Fix the import


import { legalLinks } from '../../constants/legalLinks';

import FooterBrand from './FooterBrand';
import FooterLinks from './FooterLinks';
import FooterJoinUs from './FooterJoinUs';
import FooterContact from './FooterContact';
import FooterNewsletter from './FooterNewsletter';

import LeafDecorations from '../Shared/LeafDecorations';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-cambridge-blue-900 relative overflow-hidden">
            {/* Decorative Leaf Patterns */}
            <LeafDecorations />

            {/* Newsletter Section */}
            <FooterNewsletter />

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-16 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    <FooterBrand />
                    <FooterLinks />
                    <FooterJoinUs />
                    <FooterContact />
                </div>
            </div>

            {/* Bottom Bar with Copyright */}
            <div className="border-t border-cambridge-blue-700">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="text-cambridge-blue-400 text-sm mb-4 md:mb-0">
                            © {currentYear} CropMate. All rights reserved.
                        </div>

                        <div className="flex space-x-6">
                            {legalLinks.map(link => (
                                <Link
                                    key={link.id}
                                    to={link.path}
                                    className="text-cambridge-blue-400 hover:text-mindaro-400 text-sm"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default memo(Footer);