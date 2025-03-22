import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage';
import DefaultLayout from './layouts/Layout';
import AboutUs from './pages/About/AboutUs';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;