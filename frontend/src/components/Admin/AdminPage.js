// src/components/Admin/AdminPage.js
import React, { useState, useEffect} from 'react';
import { createStock, setMarketHours } from '../../services/adminService';
import { fetchStocks } from '../../services/stockService';

const AdminPage = () => {
    const [stockData, setStockData] = useState({
        companyName: '',
        stockTicker: '',
        initialPrice: 0,
        volume: 0 // Add volume to the state
    });
    const [marketHours, setMarketHoursState] = useState({ open: '', close: '' });
    const [message, setMessage] = useState('');
    const [stocks, setStocks] = useState([]); // State to hold all stocks


    // Function to load all stocks
    const loadStocks = async () => {
        try {
            const response = await fetchStocks(); // Fetch all stocks from the API
            setStocks(response); // Update state with fetched stocks
        } catch (error) {
            console.error('Error fetching stocks:', error);
            setMessage('Error fetching stocks data');
        }
    };

    // Call loadStocks when the component mounts
    useEffect(() => {
        loadStocks();
    }, []);


    const handleCreateStock = async () => {
        try {
            await createStock(stockData);
            setMessage('Stock created successfully');
            setStockData({ companyName: '', stockTicker: '', initialPrice: 0, volume: 0 });
            loadStocks();
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
            <input
                type="text"
                placeholder="Company Name"
                value={stockData.companyName}
                onChange={e => setStockData({ ...stockData, companyName: e.target.value })}
            />
            <input
                type="text"
                placeholder="Stock Ticker"
                value={stockData.stockTicker}
                onChange={e => setStockData({ ...stockData, stockTicker: e.target.value })}
            />
            <input
                type="number"
                placeholder="Initial Price"
                value={stockData.initialPrice}
                onChange={e => setStockData({ ...stockData, initialPrice: Number(e.target.value) })}
            />
            <input
                type="number" // Use number input for volume
                placeholder="Volume"
                value={stockData.volume}
                onChange={e => setStockData({ ...stockData, volume: Number(e.target.value) })} // Set volume
            />
            <button onClick={handleCreateStock}>Create Stock</button>

            <h3>Set Market Hours</h3>
            <input type="time" value={marketHours.open} onChange={e => setMarketHoursState({ ...marketHours, open: e.target.value })} />
            <input type="time" value={marketHours.close} onChange={e => setMarketHoursState({ ...marketHours, close: e.target.value })} />
            <button onClick={handleSetMarketHours}>Set Market Hours</button>

            {/* Display Existing Stocks */}
            <h3>Existing Stocks</h3>
            {stocks.length > 0 ? ( // Check if stocks array is not empty
                <ul>
                    {stocks.map(stock => (
                        <li key={stock._id}>
                            {stock.companyName} ({stock.stockTicker}) - Current Price: ${stock.initialPrice} {/* Assuming initialPrice is the current price */}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No stocks available</p>
            )}

            {message && <p>{message}</p>}
        </div>
    );
};

export default AdminPage;
