import React, { useState } from 'react';
import { Link } from 'react-router';
import {
    Menu,
    Search,
    Bell,
    ChevronDown,
    User,
    Settings,
    HelpCircle,
    LogOut
} from 'lucide-react';

const Topbar = ({
    role = 'farmer',
    userName = 'User',
    userAvatar = '',
    onToggleSidebar,
    onToggleMobileMenu
}) => {
    const [profileOpen, setProfileOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [searchFocused, setSearchFocused] = useState(false);

    const toggleProfileMenu = () => {
        setProfileOpen(!profileOpen);
        if (notificationsOpen) setNotificationsOpen(false);
    };

    const toggleNotifications = () => {
        setNotificationsOpen(!notificationsOpen);
        if (profileOpen) setProfileOpen(false);
    };

    // Role-specific styling
    const getRoleClasses = () => {
        switch (role) {
            case 'farmer':
                return {
                    bg: 'bg-white',
                    text: 'text-cal-poly-green-800',
                    accent: 'bg-cal-poly-green-600',
                    accentHover: 'hover:bg-cal-poly-green-700',
                    badge: 'bg-cal-poly-green-500'
                };
            case 'driver':
                return {
                    bg: 'bg-white',
                    text: 'text-cambridge-blue-800',
                    accent: 'bg-cambridge-blue-600',
                    accentHover: 'hover:bg-cambridge-blue-700',
                    badge: 'bg-cambridge-blue-500'
                };
            case 'vendor':
                return {
                    bg: 'bg-white',
                    text: 'text-golden-brown-800',
                    accent: 'bg-golden-brown-600',
                    accentHover: 'hover:bg-golden-brown-700',
                    badge: 'bg-golden-brown-500'
                };
            default:
                return {
                    bg: 'bg-white',
                    text: 'text-cal-poly-green-800',
                    accent: 'bg-cal-poly-green-600',
                    accentHover: 'hover:bg-cal-poly-green-700',
                    badge: 'bg-cal-poly-green-500'
                };
        }
    };

    const { bg, text, accent, accentHover, badge } = getRoleClasses();

    return (
        <header className={`${bg} shadow-sm border-b border-gray-200 z-10`}>
            <div className="px-4 py-3 flex items-center justify-between">
                {/* Left side: Mobile menu + Search */}
                <div className="flex items-center">
                    <button
                        onClick={onToggleMobileMenu}
                        className="block lg:hidden mr-4 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
                    >
                        <Menu size={22} />
                    </button>
                    <div className={`
            hidden md:flex items-center px-3 py-2 rounded-lg transition-all
            ${searchFocused ? 'bg-gray-200 ring-2 ring-gray-300' : 'bg-gray-100'}
          `}>
                        <Search size={18} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent border-none focus:outline-none text-sm w-44 lg:w-64"
                            onFocus={() => setSearchFocused(true)}
                            onBlur={() => setSearchFocused(false)}
                        />
                    </div>
                </div>

                {/* Right side: Notifications, Messages, Profile */}
                <div className="flex items-center space-x-3">
                    {/* Search button (mobile) */}
                    <button className="md:hidden p-2 rounded-lg hover:bg-gray-100">
                        <Search size={20} />
                    </button>

                    {/* Notifications */}
                    <div className="relative">
                        <button
                            className="relative p-2 rounded-lg hover:bg-gray-100"
                            onClick={toggleNotifications}
                        >
                            <Bell size={20} />
                            <span className={`absolute top-1 right-1 w-2 h-2 ${badge} rounded-full`}></span>
                        </button>

                        {/* Notifications dropdown */}
                        {notificationsOpen && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border z-30">
                                <div className="p-3 border-b">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold">Notifications</h3>
                                        <Link to={`/dashboard/${role}/notifications`} className={`text-sm ${text} hover:underline`}>
                                            View all
                                        </Link>
                                    </div>
                                </div>

                                <div className="max-h-96 overflow-y-auto">
                                    {/* Sample notifications */}
                                    <div className="p-4 border-b hover:bg-gray-50">
                                        <div className="flex">
                                            <div className={`${accent} w-2 h-2 mt-2 mr-3 rounded-full`}></div>
                                            <div>
                                                <p className="text-sm">Your order #12345 has been confirmed</p>
                                                <p className="text-xs text-gray-500 mt-1">10 minutes ago</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border-b hover:bg-gray-50">
                                        <div className="flex">
                                            <div className="w-2 h-2 mt-2 mr-3 rounded-full"></div>
                                            <div>
                                                <p className="text-sm">New market price update available</p>
                                                <p className="text-xs text-gray-500 mt-1">1 hour ago</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-4 border-b hover:bg-gray-50">
                                        <div className="flex">
                                            <div className="w-2 h-2 mt-2 mr-3 rounded-full"></div>
                                            <div>
                                                <p className="text-sm">Payment of $235.40 received</p>
                                                <p className="text-xs text-gray-500 mt-1">Yesterday</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-2 text-center">
                                    <button className="text-sm text-gray-500 hover:text-gray-700">
                                        Mark all as read
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile */}
                    <div className="relative">
                        <button
                            className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100"
                            onClick={toggleProfileMenu}
                        >
                            {userAvatar ? (
                                <img
                                    src={userAvatar}
                                    alt={userName}
                                    className="h-8 w-8 rounded-full object-cover"
                                />
                            ) : (
                                <div className={`h-8 w-8 rounded-full ${accent} flex items-center justify-center`}>
                                    <span className="text-sm font-medium text-white">
                                        {userName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                            )}
                            <span className="hidden md:block text-sm font-medium">{userName}</span>
                            <ChevronDown size={16} />
                        </button>

                        {/* Profile dropdown */}
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border z-30">
                                <div className="p-3 border-b">
                                    <p className="font-semibold">{userName}</p>
                                    <p className="text-xs text-gray-500 capitalize">{role}</p>
                                </div>

                                <div className="py-1">
                                    <Link to={`/dashboard/${role}/profile`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <User size={16} className="mr-2" />
                                        Profile
                                    </Link>
                                    <Link to={`/dashboard/${role}/settings`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <Settings size={16} className="mr-2" />
                                        Settings
                                    </Link>
                                    <Link to={`/dashboard/${role}/help`} className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        <HelpCircle size={16} className="mr-2" />
                                        Help & Support
                                    </Link>
                                </div>

                                <div className="py-1 border-t">
                                    <Link to="/sign-in" className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                        <LogOut size={16} className="mr-2" />
                                        Sign out
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;