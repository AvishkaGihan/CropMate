import React from 'react';
import Sidebar from '../../components/dashboard/SideBar';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <main className="flex-1 p-8">{children}</main>
        </div>
    );
};

export default DashboardLayout;