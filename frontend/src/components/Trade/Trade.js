// src/components/Trade/Trade.js
import React, { useState, useEffect } from 'react';
import { fetchStocks, buyStock, sellStock } from '../../services/stockService';
import './Trade.css';

const Trade = () => {
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const loadStocks = async () => {
            try {
                const data = await fetchStocks();
                setStocks(data);
            } catch (error) {
                setMessage('Error loading stocks: ' + error.message);
            }
        };
        loadStocks();
    }, []);

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
            <form onSubmit={handleBuy}>
                <h3>Buy Stock</h3>
                <select onChange={(e) => setSelectedStock(e.target.value)} required>
                    <option value="">Select Stock</option>
                    {stocks.map(stock => (
                        <option key={stock._id} value={stock._id}>
                            {stock.stockTicker} - ${stock.currentPrice}
                        </option>
                    ))}
                </select>
                <div>
                    <label className="labels">Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
                </div>
                <button type="submit">Buy</button>
            </form>
            <form onSubmit={handleSell}>
                <h3>Sell Stock</h3>
                <select onChange={(e) => setSelectedStock(e.target.value)} required>
                    <option value="">Select Stock</option>
                    {stocks.map(stock => (
                        <option key={stock._id} value={stock._id}>
                            {stock.name} - ${stock.currentPrice}
                        </option>
                    ))}
                </select>
                <div>
                    <label className="labels">Quantity:</label>
                    <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} min="1" required />
                </div>
                <button type="submit">Sell</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Trade;
