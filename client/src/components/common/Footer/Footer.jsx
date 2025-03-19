import React from 'react';
import { Link } from 'react-router';
import SocialLinks from './SocialLinks';
import LegalLinks from './LegalLinks';
import ContactInfo from './ContactInfo';

const Footer = () => {
    return (
        <footer className="bg-gray-50 pt-12 pb-6">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <span className="text-green-700 text-xl font-bold mr-1">🌾</span>
                            <span className="text-green-700 text-xl font-bold">CropMate</span>
                        </Link>
                        <p className="text-gray-600 text-sm">
                            Connecting farmers and buyers for a sustainable future
                        </p>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">About Us</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Our Services</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Market Prices</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Farming Guide</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Weather Updates</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Crop Calendar</Link></li>
                            <li><Link to="/" className="text-gray-600 hover:text-green-600">Blog</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-4">Connect With Us</h3>
                        <SocialLinks />
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-gray-500">
                        © 2023 CropMate. All rights reserved.
                    </p>
                    <LegalLinks />
                </div>
            </div>
        </footer>
    );
};

export default Footer;