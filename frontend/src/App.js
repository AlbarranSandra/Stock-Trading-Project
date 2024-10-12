// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/Auth/LoginRegister';
import Portfolio from './components/Dashboard/Portfolio'; // Portfolio component
import Trade from './components/Trade/Trade';
import AdminPage from './components/Admin/AdminPage'; // Ensure the correct path to AdminPage

function App() {
  return (
    <Router>
      <Routes>
        {/* Use element instead of component and wrap components in JSX */}
        <Route path="/" element={<LoginRegister />} />
        <Route path="/portfolio" element={<Portfolio />} /> {/* Updated to remove userId */}
        <Route path="/admin" element={<AdminPage />} />  {/* Admin dashboard route */}
        <Route path="/trade" element={<Trade />} />
      </Routes>
    </Router>
  );
}

export default App;
