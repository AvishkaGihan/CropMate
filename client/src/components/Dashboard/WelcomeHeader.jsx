import React, { useState, useEffect } from 'react';
import {
    Sun,
    Moon,
    Sunrise,
    Sunset,
    Package,
    ShoppingCart,
    TrendingUp
} from 'lucide-react';

/**
 * Reusable welcome header component for dashboard pages
 * @param {Object} props
 * @param {string} props.userName - User's name to display in greeting
 * @param {string} props.userRole - User's role (e.g., 'farmer', 'buyer') for role-specific content
 * @param {Object[]} props.quickStats - Array of quick stats to show in small cards below header
 * @param {React.ReactNode} props.statusBadge - Optional custom status badge
 */
const WelcomeHeader = ({
    userName = 'User',
    userRole = 'farmer',
    quickStats = [],
    statusBadge = null
}) => {
    const [greeting, setGreeting] = useState('');
    const [currentTime, setCurrentTime] = useState(new Date());
    const [timeIcon, setTimeIcon] = useState(<Sun size={24} className="text-amber-500" />);

    // Set greeting based on time of day
    useEffect(() => {
        const hour = currentTime.getHours();

        // Set greeting text based on time
        if (hour < 6) {
            setGreeting('Good Morning');
            setTimeIcon(<Moon size={24} className="text-indigo-500" />);
        } else if (hour < 12) {
            setGreeting('Good Morning');
            setTimeIcon(<Sunrise size={24} className="text-amber-500" />);
        } else if (hour < 17) {
            setGreeting('Good Afternoon');
            setTimeIcon(<Sun size={24} className="text-amber-500" />);
        } else if (hour < 20) {
            setGreeting('Good Evening');
            setTimeIcon(<Sunset size={24} className="text-orange-500" />);
        } else {
            setGreeting('Good Evening');
            setTimeIcon(<Moon size={24} className="text-indigo-500" />);
        }
    }, [currentTime]);

    // Get date display for the welcome header
    const getTodayDate = () => {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date().toLocaleDateString('en-US', options);
    };

    // Role-specific welcome messages
    const getWelcomeMessage = () => {
        switch (userRole.toLowerCase()) {
            case 'farmer':
                return "Welcome to your CropMate dashboard. Here's what's happening with your farm today.";
            case 'buyer':
                return "Welcome to your CropMate dashboard. Discover fresh produce from local farmers.";
            case 'admin':
                return "Welcome to your CropMate admin panel. Manage your platform effectively.";
            default:
                return "Welcome to your CropMate dashboard. Here's your daily summary.";
        }
    };

    // Default status badge if none provided
    const defaultStatusBadge = (
        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-200 text-green-800">
            <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
            {userRole === 'farmer' ? 'Your farm is showing healthy activity' : 'All systems operational'}
        </div>
    );

    return (
        <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6 border border-green-200 shadow-sm">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-2">
                    <div className="flex items-center">
                        {timeIcon}
                        <h1 className="text-2xl font-bold text-gray-800 ml-2">{greeting}, {userName}!</h1>
                    </div>
                    <p className="text-gray-600">{getWelcomeMessage()}</p>
                    <p className="text-sm text-gray-500">{getTodayDate()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    {statusBadge || defaultStatusBadge}
                </div>
            </div>

            {quickStats && quickStats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg flex items-center space-x-3 border border-gray-100">
                            <div className={`p-2 rounded-lg ${stat.iconBg || 'bg-blue-50'}`}>
                                {stat.icon}
                            </div>
                            <div>
                                <p className="text-xs text-gray-500">{stat.label}</p>
                                <p className="font-medium">{stat.value}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default WelcomeHeader;