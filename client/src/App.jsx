import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage';
import DefaultLayout from './layouts/Layout';
import AboutUs from './pages/About/AboutUs';
import ContactUs from './pages/Contact/ContactUs';
import Marketplace from './pages/Marketplace/Marketplace';
import ProductDetails from './pages/ProductDetail/ProductDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;