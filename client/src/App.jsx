import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router'; // Fixed import
import HomePage from './pages/Home/HomePage';
import DefaultLayout from './layouts/Layout';
import AboutUs from './pages/About/AboutUs';
import ContactUs from './pages/Contact/ContactUs';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetails from './pages/ProductDetail/ProductDetails';
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import DashboardLayout from './layouts/DashboardLayout';

// Temporary placeholder components for dashboard pages
const FarmerDashboard = () => <div className="p-4">Farmer Dashboard Content</div>;
const DriverDashboard = () => <div className="p-4">Driver Dashboard Content</div>;
const VendorDashboard = () => <div className="p-4">Vendor Dashboard Content</div>;

const SelectDashboard = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Select Dashboard</h1>
      <div className="space-y-4">
        <a href="/dashboard/farmer" className="block w-full p-4 text-center bg-cal-poly-green-600 text-white rounded-lg hover:bg-cal-poly-green-700 transition-colors">
          Farmer Dashboard
        </a>
        <a href="/dashboard/driver" className="block w-full p-4 text-center bg-cambridge-blue-600 text-white rounded-lg hover:bg-cambridge-blue-700 transition-colors">
          Driver Dashboard
        </a>
        <a href="/dashboard/vendor" className="block w-full p-4 text-center bg-golden-brown-600 text-white rounded-lg hover:bg-golden-brown-700 transition-colors">
          Vendor Dashboard
        </a>
      </div>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>

        {/* Dashboard routes */}
        <Route path="/dashboard/farmer/*" element={<DashboardLayout role="farmer" />}>
          <Route index element={<FarmerDashboard />} />
          {/* Add more farmer routes as needed */}
        </Route>

        <Route path="/dashboard/driver/*" element={<DashboardLayout role="driver" />}>
          <Route index element={<DriverDashboard />} />
          {/* Add more driver routes as needed */}
        </Route>

        <Route path="/dashboard/vendor/*" element={<DashboardLayout role="vendor" />}>
          <Route index element={<VendorDashboard />} />
          {/* Add more vendor routes as needed */}
        </Route>

        <Route path="/dashboard" element={<SelectDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;