import axios from 'axios';

const token = localStorage.getItem('token');

// Function to fetch the list of stocks
export const fetchStocks = async () => {
    const response = await axios.get('http://127.0.0.1:5000/api/stocks/all', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Function to buy stocks
export const buyStock = async (stockId, quantity) => {
    const response = await axios.post('http://127.0.0.1:5000/api/trades/buy', {
        stockId, quantity
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

// Function to sell stocks
export const sellStock = async (stockId, quantity) => {
    const response = await axios.post('http://127.0.0.1:5000/api/trades/sell', {
        stockId, quantity
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
