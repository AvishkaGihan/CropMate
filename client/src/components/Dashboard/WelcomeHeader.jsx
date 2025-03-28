import React, { useState, useEffect } from 'react';
import {
    Sun,
    Moon,
    Sunrise,
    Sunset,
    Package,
    ShoppingCart,
    TrendingUp,
    Truck,
    Sprout,
    Store,
    Users
} from 'lucide-react';

/**
 * Reusable welcome header component for dashboard pages
 * @param {Object} props
 * @param {string} props.userName - User's name to display in greeting
 * @param {string} props.userRole - User's role (e.g., 'farmer', 'vendor', 'driver') for role-specific content
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

    // Enhanced role-specific welcome messages
    const getWelcomeMessage = () => {
        switch (userRole.toLowerCase()) {
            case 'farmer':
                return "Manage your crops, track harvests, and connect with buyers through your farm dashboard.";
            case 'vendor':
                return "Track your orders, manage deliveries, and keep your inventory updated for your customers.";
            case 'buyer':
                return "Discover fresh produce from local farmers and track your orders in real-time.";
            case 'driver':
                return "View your delivery assignments, track routes, and manage your delivery schedule.";
            case 'admin':
                return "Oversee platform operations, manage users, and ensure smooth transactions across CropMate.";
            default:
                return "Welcome to your CropMate dashboard. Here's your daily summary.";
        }
    };

    // Enhanced role-specific background styling
    const getHeaderBackgroundClass = () => {
        switch (userRole.toLowerCase()) {
            case 'farmer':
                return "from-green-50 to-green-100 border-green-200";
            case 'vendor':
                return "from-golden-brown-50 to-golden-brown-100 border-golden-brown-200";
            case 'driver':
                return "from-cambridge-blue-50 to-cambridge-blue-100 border-cambridge-blue-200";
            case 'admin':
                return "from-purple-50 to-purple-100 border-purple-200";
            case 'buyer':
                return "from-blue-50 to-blue-100 border-blue-200";
            default:
                return "from-gray-50 to-gray-100 border-gray-200";
        }
    };

    // Enhanced role-specific icons
    const getRoleIcon = () => {
        const size = 18;
        switch (userRole.toLowerCase()) {
            case 'farmer':
                return <Sprout size={size} className="text-green-600" />;
            case 'vendor':
                return <Store size={size} className="text-golden-brown-600" />;
            case 'driver':
                return <Truck size={size} className="text-cambridge-blue-600" />;
            case 'admin':
                return <Users size={size} className="text-purple-600" />;
            case 'buyer':
                return <ShoppingCart size={size} className="text-blue-600" />;
            default:
                return null;
        }
    };

    // Enhanced default status badges for different roles
    const defaultStatusBadge = () => {
        switch (userRole.toLowerCase()) {
            case 'farmer':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        Your farm is showing healthy activity
                    </div>
                );
            case 'vendor':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-golden-brown-100 text-golden-brown-800">
                        <span className="w-2 h-2 rounded-full bg-golden-brown-500 mr-2"></span>
                        Your store is open for orders
                    </div>
                );
            case 'driver':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-cambridge-blue-100 text-cambridge-blue-800">
                        <span className="w-2 h-2 rounded-full bg-cambridge-blue-500 mr-2"></span>
                        Online and available for deliveries
                    </div>
                );
            case 'admin':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                        <span className="w-2 h-2 rounded-full bg-purple-500 mr-2"></span>
                        All systems operational
                    </div>
                );
            case 'buyer':
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                        <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                        Ready to explore today's fresh produce
                    </div>
                );
            default:
                return (
                    <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                        <span className="w-2 h-2 rounded-full bg-gray-500 mr-2"></span>
                        Welcome to CropMate
                    </div>
                );
        }
    };

    return (
        <div className={`bg-gradient-to-r ${getHeaderBackgroundClass()} rounded-lg p-6 border shadow-sm`}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="space-y-2">
                    <div className="flex items-center">
                        {timeIcon}
                        <h1 className="text-2xl font-bold text-gray-800 ml-2">{greeting}, {userName}!</h1>
                    </div>
                    <div className="flex items-center">
                        {getRoleIcon()}
                        <p className="text-gray-600 ml-2">{getWelcomeMessage()}</p>
                    </div>
                    <p className="text-sm text-gray-500">{getTodayDate()}</p>
                </div>
                <div className="mt-4 md:mt-0">
                    {statusBadge || defaultStatusBadge()}
                </div>
            </div>

            {quickStats && quickStats.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                    {quickStats.map((stat, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg flex items-center space-x-3 border border-gray-100 shadow-sm">
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