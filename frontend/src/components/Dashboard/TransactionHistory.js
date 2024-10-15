import React, { useState, useEffect } from 'react';
import { fetchTransactionHistory } from '../../services/TransactionService';  
import './TransactionHistory.css';
const TransactionHistory = () => {
    const [transactions, setTransactions] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const loadTransactions = async () => {
            try {
                const data = await fetchTransactionHistory();  
                setTransactions(data);
            } catch (err) {
                setError('Error fetching transaction history');
            }
        };

        loadTransactions();
    }, []);

    return (
        <div className="transaction-history-container">
            <h2>Transaction History</h2>
            {error && <p>{error}</p>}
            {transactions.length === 0 && <p>No transactions available.</p>}
            <ul>
                {transactions.map(transaction => (
                    <li key={transaction._id} className="transaction-item">
                        <h3>{transaction.stock.companyName} ({transaction.stock.stockTicker})</h3>
                        <p>Type: {transaction.type.toUpperCase()}</p>
                        <p>Quantity: {transaction.quantity}</p>
                        <p>Price: ${transaction.price.toFixed(2)}</p>
                        <p>Date: {new Date(transaction.date).toLocaleString()}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionHistory;
