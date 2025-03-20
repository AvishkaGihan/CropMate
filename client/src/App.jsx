import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import HomePage from './pages/Home/HomePage';
import DefaultLayout from './layouts/Layout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<HomePage />} />
          {/* Add other routes as needed */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;