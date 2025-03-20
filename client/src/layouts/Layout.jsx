import React from 'react';
import { Outlet } from 'react-router';
import Header from '../components/Header/Header';

const DefaultLayout = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-grow">
                <Header />
                <Outlet />
            </main>
        </div>
    );
};

export default DefaultLayout;