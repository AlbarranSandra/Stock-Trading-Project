import React, { useState, useEffect} from 'react';
import { createStock, setMarketHours } from '../../services/adminService';
import { fetchStocks } from '../../services/stockService';
import './AdminPage.css';


const AdminPage = () => {
    const [stockData, setStockData] = useState({
        companyName: '',
        stockTicker: '',
        initialPrice: '',
        volume: '' 
    });
    const [marketHours, setMarketHoursState] = useState({ open: '', close: '' });
    const [message, setMessage] = useState('');
    const [stocks, setStocks] = useState([]); 

    const loadStocks = async () => {
        try {
            const data = await fetchStocks();
            setStocks(data);
        } catch (error) {
            setMessage('Error loading stocks: ' + error.message);
        }
    };

    useEffect(() => {
        loadStocks();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            loadStocks();
        }, 5000);

        return () => clearInterval(interval);
    }, []);


    const handleCreateStock = async () => {
        try {
            await createStock(stockData);
            setMessage('Stock created successfully');
            setStockData({ companyName: '', stockTicker: '', initialPrice: '', volume: '' });
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
            <h2>Admin Dashboard for SAZ Trades</h2>

            {message && <p>{message}</p>}
            
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
                type="number" 
                placeholder="Volume"
                value={stockData.volume}
                onChange={e => setStockData({ ...stockData, volume: Number(e.target.value) })} 
            />
            <button onClick={handleCreateStock}>Create Stock</button>

            <h3>Set Market Hours</h3>
            <input type="time" value={marketHours.open} onChange={e => setMarketHoursState({ ...marketHours, open: e.target.value })} />
            <input type="time" value={marketHours.close} onChange={e => setMarketHoursState({ ...marketHours, close: e.target.value })} />
            <button onClick={handleSetMarketHours}>Set Market Hours</button>

            <h3>Existing Stocks</h3>
            {stocks.length > 0 ? ( 
                <ul>
                    {stocks.map(stock => (
                        <li key={stock._id}>
                            {stock.companyName} ({stock.stockTicker}) - Volume : {stock.volume} | InitialPrice : {stock.initialPrice} | Current Price : {stock.currentPrice}
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No stocks available</p>
            )}

            
        </div>
    );
};

export default AdminPage;
