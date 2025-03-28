import React, { memo } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';

// You can import contactInfo or create it here if it doesn't match your needs
// import { contactInfo } from '../../constants/contactInfo';

const contactInfo = [
    {
        id: 1,
        icon: MapPin,
        content: <>123 Agriculture Road, Colombo<br />Sri Lanka</>,
        isLink: false
    },
    {
        id: 2,
        icon: Phone,
        content: "+94 11 234 5678",
        href: "tel:+94112345678",
        isLink: true
    },
    {
        id: 3,
        icon: Mail,
        content: "info@cropmate.lk",
        href: "mailto:info@cropmate.lk",
        isLink: true
    }
];

const FooterContact = () => {
    return (
        <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
                <span className="w-6 h-6 bg-cambridge-blue-700 rounded-md flex items-center justify-center mr-2">
                    <Mail size={14} className="text-mindaro-400" />
                </span>
                Contact Us
            </h3>

            <ul className="space-y-4">
                {contactInfo.map(item => {
                    const Icon = item.icon;
                    return (
                        <li key={item.id} className="flex items-start">
                            <Icon className="w-5 h-5 text-golden-brown-400 mt-1 mr-3" />
                            {item.isLink ? (
                                <a href={item.href} className="text-cambridge-blue-300 hover:text-mindaro-400">
                                    {item.content}
                                </a>
                            ) : (
                                <span className="text-cambridge-blue-300">
                                    {item.content}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>

            <Link
                to="/contact-us"
                className="inline-flex items-center mt-5 px-4 py-2 bg-cambridge-blue-700 hover:bg-cambridge-blue-600 text-white rounded-lg transition-colors text-sm"
            >
                Send a Message
                <ChevronRight size={16} className="ml-1" />
            </Link>
        </div>
    );
};

export default memo(FooterContact);