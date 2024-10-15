// src/components/Trade/Trade.js
import React, { useState, useEffect } from 'react';
import { fetchStocks, buyStock, sellStock } from '../../services/stockService';
import './Trade.css';

const Trade = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState('');
    const [currentPrice, setCurrentPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    
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

    useEffect(() => {
        const stock = stocks.find(stock => stock._id === selectedStock);
        if (stock) {
            setCurrentPrice(stock.currentPrice);
        }
    }, [selectedStock, stocks]);

    const handleBuy = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await buyStock(selectedStock, quantity);
            setMessage(response.message);
        } catch (error) {
            setMessage('Error buying stock: ' + error.response.data.message);
        }
    };

    const handleSell = async (e) => {
        e.preventDefault();
        setMessage('');
        try {
            const response = await sellStock(selectedStock, quantity);
            setMessage(response.message);
        } catch (error) {
            setMessage('Error selling stock: ' + error.response.data.message);
        }
    };

    return (
        <div className="trade-container">
            <h2>Trade Stocks</h2>
            <h3>Buy/Sell Stock</h3>
            {selectedStock && (
                <div className="current-price-box">
                    <h4>Current Price: ${currentPrice}</h4>
                </div>
            )}

            <select onChange={(e) => setSelectedStock(e.target.value)} required>
                <option value="">Select Stock</option>
                {stocks.map(stock => (
                    <option key={stock._id} value={stock._id}>
                        {stock.companyName} ({stock.stockTicker})
                    </option>
                ))}
            </select>

            <div>
                <label className="labels">Quantity:</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
            </div>

            <div className="button-group">
                <button onClick={handleBuy}>Buy</button>
                <button onClick={handleSell}>Sell</button>
            </div>

            {message && <p>{message}</p>}
        </div>
    );
};

export default Trade;
