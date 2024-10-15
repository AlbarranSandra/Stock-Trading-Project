
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegister from './components/Auth/LoginRegister';
import Portfolio from './components/Dashboard/Portfolio'; 
import Trade from './components/Trade/Trade';
import AdminPage from './components/Admin/AdminPage'; 
import TransactionHistory from './components/Dashboard/TransactionHistory';

function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<LoginRegister />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/admin" element={<AdminPage />} />  
        <Route path="/trade" element={<Trade />} />
        <Route path="/transaction-history" element={<TransactionHistory/>} />
      </Routes>
    </Router>
  );
}

export default App;
