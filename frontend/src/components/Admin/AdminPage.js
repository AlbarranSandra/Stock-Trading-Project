// src/components/Admin/AdminPage.js
import React, { useState } from 'react';
import { createStock, setMarketHours } from '../../services/adminService';

const AdminPage = () => {
    const [stockData, setStockData] = useState({ companyName: '', stockTicker: '', initialPrice: 0 });
    const [marketHours, setMarketHoursState] = useState({ open: '', close: '' });
    const [message, setMessage] = useState('');

    const handleCreateStock = async () => {
        try {
            await createStock(stockData);
            setMessage('Stock created successfully');
        } catch (error) {
            setMessage('Error creating stock: ' + error.message);
        }
    };

    const handleSetMarketHours = async () => {
        try {
            await setMarketHours(marketHours);
            setMessage('Market hours set successfully');
        } catch (error) {
            setMessage('Error setting market hours: ' + error.message);
        }
    };

    return (
        <div className="admin-page">
            <h2>Admin Dashboard</h2>

            <h3>Create Stock</h3>
            <input type="text" placeholder="Company Name" value={stockData.companyName} onChange={e => setStockData({ ...stockData, companyName: e.target.value })} />
            <input type="text" placeholder="Stock Ticker" value={stockData.stockTicker} onChange={e => setStockData({ ...stockData, stockTicker: e.target.value })} />
            <input type="number" placeholder="Initial Price" value={stockData.initialPrice} onChange={e => setStockData({ ...stockData, initialPrice: Number(e.target.value) })} />
            <button onClick={handleCreateStock}>Create Stock</button>

            <h3>Set Market Hours</h3>
            <input type="time" value={marketHours.open} onChange={e => setMarketHoursState({ ...marketHours, open: e.target.value })} />
            <input type="time" value={marketHours.close} onChange={e => setMarketHoursState({ ...marketHours, close: e.target.value })} />
            <button onClick={handleSetMarketHours}>Set Market Hours</button>

            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPage;
