import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router"; // Fixed import
import HomePage from "./pages/Home/HomePage";
import DefaultLayout from "./layouts/Layout";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/Contact/ContactUs";
import Marketplace from "./pages/Marketplace/Marketplace";
import ProductDetails from "./pages/ProductDetail/ProductDetails";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import DashboardLayout from "./layouts/DashboardLayout";
import CropManagement from "./pages/Dashboard/Farmer/CropManagement";
import MarketAnalysis from "./pages/Dashboard/Farmer/MarketAnalysis";
import Orders from "./pages/Dashboard/Farmer/Orders";
import FarmerOverview from "./pages/Dashboard/Farmer/FarmerOverview";
import DriverOverview from "./pages/Dashboard/Driver/DriverOverview";
import AvailableOrders from "./pages/Dashboard/Driver/AvailableOrders";
import ActiveDeliveries from "./pages/Dashboard/Driver/ActiveDeliveries";
import VendorOverview from "./pages/Dashboard/Vendor/VendorOverview";
import MyOrders from "./pages/Dashboard/Vendor/MyOrders";
import OrderNow from "./pages/OrderNow/OrderNow";

const VendorDashboard = () => (
  <div className="p-4">Vendor Dashboard Content</div>
);

const SelectDashboard = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
      <h1 className="text-2xl font-bold text-center mb-6">Select Dashboard</h1>
      <div className="space-y-4">
        <a
          href="/dashboard/farmer"
          className="block w-full p-4 text-center bg-cal-poly-green-600 text-white rounded-lg hover:bg-cal-poly-green-700 transition-colors"
        >
          Farmer Dashboard
        </a>
        <a
          href="/dashboard/driver"
          className="block w-full p-4 text-center bg-cambridge-blue-600 text-white rounded-lg hover:bg-cambridge-blue-700 transition-colors"
        >
          Driver Dashboard
        </a>
        <a
          href="/dashboard/vendor"
          className="block w-full p-4 text-center bg-golden-brown-600 text-white rounded-lg hover:bg-golden-brown-700 transition-colors"
        >
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
          <Route path="/order-now" element={<OrderNow />} />
        </Route>

        {/* Dashboard routes */}
        <Route
          path="/dashboard/farmer/*"
          element={<DashboardLayout role="farmer" />}
        >
          <Route index element={<FarmerOverview />} />
          <Route path="crops" element={<CropManagement />} />
          <Route path="market" element={<MarketAnalysis />} />
          <Route path="orders" element={<Orders />} />
          {/* Add more farmer routes as needed */}
        </Route>

        <Route
          path="/dashboard/driver/*"
          element={<DashboardLayout role="driver" />}
        >
          <Route index element={<DriverOverview />} />
          <Route path="available-orders" element={<AvailableOrders />} />
          <Route path="active" element={<ActiveDeliveries />} />
          {/* Add more driver routes as needed */}
        </Route>

        <Route
          path="/dashboard/vendor/*"
          element={<DashboardLayout role="vendor" />}
        >
          <Route index element={<VendorOverview />} />
          <Route path="orders" element={<MyOrders />} />
          {/* Add more vendor routes as needed */}
        </Route>

        <Route path="/dashboard" element={<SelectDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
