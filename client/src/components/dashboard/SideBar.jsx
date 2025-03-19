import React from 'react';
import { Link, useLocation } from 'react-router';
import { Package, Truck, User, BarChart2, LogOut } from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    // Determine if user is farmer or driver based on current route
    const isFarmer = location.pathname.includes('/harvest');

    return (
        <div className="w-64 bg-green-800 text-white">
            <div className="p-4">
                <Link to="/" className="flex items-center gap-2 text-white">
                    <div className="rounded-md bg-green-700 p-4 flex items-center justify-center">
                        <span className="text-2xl font-bold">F</span>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold">Dashboard</h1>
                        <p className="text-sm text-gray-300">
                            {isFarmer ? 'Farmer Account' : 'Driver Account'}
                        </p>
                    </div>
                </Link>
            </div>

            <div className="mt-6">
                <div className="px-4 py-2 text-xs text-gray-300">ACCOUNT</div>
                <Link
                    to="/profile"
                    className={`flex items-center gap-2 px-4 py-3 ${isActive('/profile') ? 'bg-green-700' : 'hover:bg-green-700'
                        }`}
                >
                    <User size={20} />
                    <span>Profile</span>
                </Link>

                <div className="px-4 py-2 text-xs text-gray-300 mt-4">MAIN MENU</div>
                <Link
                    to="/orders"
                    className={`flex items-center gap-2 px-4 py-3 ${isActive('/orders') ? 'bg-green-700' : 'hover:bg-green-700'
                        }`}
                >
                    <Package size={20} />
                    <span>Orders</span>
                </Link>

                <Link
                    to="/delivery-requests"
                    className={`flex items-center gap-2 px-4 py-3 ${isActive('/delivery-requests') ? 'bg-green-700' : 'hover:bg-green-700'
                        }`}
                >
                    <Truck size={20} />
                    <span>Delivery Requests</span>
                </Link>

                {isFarmer && (
                    <Link
                        to="/harvest-hub"
                        className={`flex items-center gap-2 px-4 py-3 ${isActive('/harvest-hub') ? 'bg-green-700' : 'hover:bg-green-700'
                            }`}
                    >
                        <BarChart2 size={20} />
                        <span>Harvest Hub</span>
                    </Link>
                )}
            </div>

            <div className="mt-auto p-4 absolute bottom-0 w-full">
                <Link
                    to="/logout"
                    className="flex items-center gap-2 px-4 py-3 hover:bg-green-700 text-yellow-400"
                >
                    <LogOut size={20} />
                    <span>Logout</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;