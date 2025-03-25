import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

const DefaultLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Header />
                <Outlet />
                <Footer />
            </main>
        </div>
    );
};

export default DefaultLayout;