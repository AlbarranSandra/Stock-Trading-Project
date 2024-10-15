import axios from 'axios';

const token = localStorage.getItem('token');


export const fetchStocks = async () => {
    const response = await axios.get('http://127.0.0.1:5000/api/stocks/all', {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


export const buyStock = async (stockId, quantity) => {
    const response = await axios.post('http://127.0.0.1:5000/api/trades/buy', {
        stockId, quantity
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};


export const sellStock = async (stockId, quantity) => {
    const response = await axios.post('http://127.0.0.1:5000/api/trades/sell', {
        stockId, quantity
    }, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
