import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import Footer from '../components/Dashboard/Footer';
import { Menu } from 'lucide-react';

const DashboardLayout = ({ role = 'farmer' }) => {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [pageTitle, setPageTitle] = useState('Dashboard');
    const [breadcrumbs, setBreadcrumbs] = useState([
        { label: 'Dashboard', path: `/dashboard/${role}` }
    ]);

    const toggleSidebar = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    };

    const toggleMobileSidebar = (state) => {
        setMobileMenuOpen(typeof state === 'boolean' ? state : !mobileMenuOpen);
    };

    // Role-specific colors
    const roleColors = {
        farmer: {
            primary: 'bg-cal-poly-green-50',
            accent: 'bg-cal-poly-green-600',
            text: 'text-cal-poly-green-800'
        },
        driver: {
            primary: 'bg-cambridge-blue-50',
            accent: 'bg-cambridge-blue-600',
            text: 'text-cambridge-blue-800'
        },
        vendor: {
            primary: 'bg-golden-brown-50',
            accent: 'bg-golden-brown-600',
            text: 'text-golden-brown-800'
        }
    };

    const currentColors = roleColors[role] || roleColors.farmer;

    return (
        <div className="flex h-screen overflow-hidden bg-gray-50">
            {/* Enhanced Sidebar with mobile support */}
            <Sidebar
                isOpen={!sidebarCollapsed}
                toggleSidebar={toggleSidebar}
                role={role}
                mobileOpen={mobileMenuOpen}
                toggleMobileSidebar={toggleMobileSidebar}
            />

            {/* Main Content */}
            <div className="flex flex-col flex-1 w-0 overflow-hidden">
                <main className={`relative flex-1 overflow-y-auto focus:outline-none ${currentColors.primary}`}>
                    {/* Mobile Menu Button - Only visible on mobile */}
                    <div className="lg:hidden border-b border-gray-200 bg-white px-4 py-2">
                        <button
                            type="button"
                            className={`inline-flex items-center p-2 rounded-md text-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-300`}
                            onClick={toggleMobileSidebar}
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" aria-hidden="true" />
                            <span className="ml-2 text-sm font-medium">Menu</span>
                        </button>
                    </div>
                    {/* Page Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-4 md:p-6"
                    >
                        <Outlet context={{ setPageTitle, setBreadcrumbs }} />
                    </motion.div>

                    {/* Footer */}
                    <Footer role={role} />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;