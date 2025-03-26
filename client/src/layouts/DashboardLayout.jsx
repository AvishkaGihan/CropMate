import React, { useState } from 'react';
import { Outlet } from 'react-router';
import { motion } from 'framer-motion';
import Sidebar from '../components/Dashboard/Sidebar/Sidebar';
import PageHeader from '../components/Dashboard/PageHeader';
import Footer from '../components/Dashboard/Footer';

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
                    {/* Page Header with title and actions */}
                    <PageHeader
                        title={pageTitle}
                        breadcrumbs={breadcrumbs}
                        role={role}
                        onToggleMobileMenu={toggleMobileSidebar}
                    />

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