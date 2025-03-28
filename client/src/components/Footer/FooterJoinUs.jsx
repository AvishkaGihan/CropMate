import React, { memo } from 'react';
import { Link } from 'react-router';
import { Users, Sprout, Handshake, Truck } from 'lucide-react';

// Create a constant for join options data
const joinOptions = [
    {
        id: 1,
        to: "/signup?as=farmer",
        icon: Sprout,
        colorClass: "golden-brown",
        title: "For Farmers",
        description: "Sell your produce directly"
    },
    {
        id: 2,
        to: "/signup?as=buyer",
        icon: Handshake,
        colorClass: "cal-poly-green",
        title: "For Buyers",
        description: "Source fresh produce"
    },
    {
        id: 3,
        to: "/signup?as=driver",
        icon: Truck,
        colorClass: "cambridge-blue",
        title: "For Drivers",
        description: "Help deliver products"
    }
];

const FooterJoinUs = () => {
    return (
        <div>
            <h3 className="text-white font-semibold text-lg mb-5 flex items-center">
                <span className="w-6 h-6 bg-cambridge-blue-700 rounded-md flex items-center justify-center mr-2">
                    <Users size={14} className="text-mindaro-400" />
                </span>
                Join Us
            </h3>

            <ul className="space-y-4">
                {joinOptions.map(option => {
                    const Icon = option.icon;
                    return (
                        <li key={option.id} className="group">
                            <Link to={option.to} className="flex">
                                <span className={`w-8 h-8 rounded-full bg-${option.colorClass}-500/20 flex items-center justify-center mr-3 text-${option.colorClass}-400 group-hover:bg-${option.colorClass}-500/30 transition-colors`}>
                                    <Icon size={16} />
                                </span>
                                <div>
                                    <span className="block text-white group-hover:text-mindaro-400 transition-colors">{option.title}</span>
                                    <span className="text-xs text-cambridge-blue-400">{option.description}</span>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default memo(FooterJoinUs);