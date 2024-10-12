import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get route parameters
import { fetchPortfolioById, deposit, withdraw } from '../../services/portfolioService';
import { buyStock, sellStock } from '../../services/stockService';

const Portfolio = () => {
    const { portfolioId } = useParams(); // Get portfolioId from route parameters
    const [portfolio, setPortfolio] = useState(null);
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState(0);
    const [stockTicker, setStockTicker] = useState('');
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const loadPortfolio = async () => {
            try {
                const token = localStorage.getItem('token'); // Retrieve token from local storage
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }

                const data = await fetchPortfolioById(); // Fetch portfolio by portfolioId
                setPortfolio(data);
            } catch (error) {
                setMessage('Error loading portfolio: ' + error.message);
            }
        };

        loadPortfolio(); 

    }, [portfolioId]);

    const handleDeposit = async () => {
        try {
            await deposit(amount);
            setMessage('Deposit successful');
            setPortfolio({ ...portfolio, cashBalance: portfolio.cashBalance + amount });
        } catch (error) {
            setMessage('Error during deposit: ' + error.message);
        }
    };

    const handleWithdraw = async () => {
        try {
            await withdraw(amount);
            setMessage('Withdrawal successful');
            setPortfolio({ ...portfolio, cashBalance: portfolio.cashBalance - amount });
        } catch (error) {
            setMessage('Error during withdrawal: ' + error.message);
        }
    };

    const handleBuyStock = async () => {
        try {
            await buyStock(stockTicker, quantity);
            setMessage('Stock purchase successful');
            // Optionally refresh portfolio after the transaction
        } catch (error) {
            setMessage('Error during stock purchase: ' + error.message);
        }
    };

    const handleSellStock = async () => {
        try {
            await sellStock(stockTicker, quantity);
            setMessage('Stock sale successful');
            // Optionally refresh portfolio after the transaction
        } catch (error) {
            setMessage('Error during stock sale: ' + error.message);
        }
    };

    return (
        <div className="portfolio-container">
            <h2>Your Portfolio</h2>
            {message && <p>{message}</p>}
            {portfolio && (
                <div>
                    <h3>Cash Balance: ${portfolio.cashBalance}</h3>
                    <h4>Stocks:</h4>
                    <ul>
                        {portfolio.stocks.map(stock => (
                            <li key={stock.stock._id}>
                                {stock.stock.companyName} ({stock.stock.stockTicker}): {stock.quantity}
                            </li>
                        ))}
                    </ul>

                    <div>
                        <h3>Buy/Sell Stocks</h3>
                        <input
                            type="text"
                            placeholder="Stock Ticker"
                            value={stockTicker}
                            onChange={e => setStockTicker(e.target.value)}
                        />
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantity}
                            onChange={e => setQuantity(Number(e.target.value))}
                        />
                        <button onClick={handleBuyStock}>Buy Stock</button>
                        <button onClick={handleSellStock}>Sell Stock</button>
                    </div>

                    <div>
                        <h3>Deposit/Withdraw Funds</h3>
                        <input
                            type="number"
                            value={amount}
                            onChange={e => setAmount(Number(e.target.value))}
                        />
                        <button onClick={handleDeposit}>Deposit</button>
                        <button onClick={handleWithdraw}>Withdraw</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Portfolio;
