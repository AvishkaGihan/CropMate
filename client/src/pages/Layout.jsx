// src/pages/Layout.js
import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/common/Header/Header';
import Footer from '../components/common/Footer/Footer';

const Layout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;