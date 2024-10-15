import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchPortfolioById, deposit, withdraw } from '../../services/portfolioService';
import './Portfolio.css';

const Portfolio = () => {
    const [portfolio, setPortfolio] = useState(null);
    const [message, setMessage] = useState('');
    const [amount, setAmount] = useState('');
    const navigate = useNavigate(); 
    
    
   
        const loadPortfolio = async () => {
            try {
                const token = localStorage.getItem('token'); 
                if (!token) {
                    throw new Error('No token found. Please log in.');
                }

                const data = await fetchPortfolioById(); 
                setPortfolio(data);
            } catch (error) {
                setMessage('Error loading portfolio: ' + error.message);
            }
        };

        useEffect(() => {
        loadPortfolio();
        }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            loadPortfolio();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

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

    const goToStocksPage = () => {
        navigate('/trade'); 
    };
    const goToTransactionHistory = () => {
        navigate('/transaction-history');  
    };

    return (
        <div className="portfolio-container">
            <h2>Your Portfolio</h2>
            {message && <p>{message}</p>}
            {portfolio && (
                <div>
                    <h3>Cash Balance: ${(portfolio.cashBalance).toFixed(2)}</h3>
                    <h4>My Stocks:</h4>
                    <ul>
                        {portfolio.stocks.map(stock => (
                            <li key={stock.stock._id}>
                                {stock.stock.companyName} ({stock.stock.stockTicker}) - Quantity : {stock.quantity} | Current Price : {stock.stock.currentPrice} | Value : {(stock.quantity * stock.stock.currentPrice).toFixed(2)} 
                            </li>
                        ))}
                    </ul>

                    <button onClick={goToStocksPage}>Trade</button>
                    <button onClick={goToTransactionHistory} className="transaction-history-btn">
                        View Transaction History
                    </button>   
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
