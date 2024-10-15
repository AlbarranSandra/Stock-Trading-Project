import axios from 'axios';

export const createStock = async (stockData) => {
    const token = localStorage.getItem('token');  
    const response = await axios.post('http://127.0.0.1:5000/api/stocks/create', stockData, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};

export const setMarketHours = async (marketHours) => {
    const token = localStorage.getItem('token');  
    const response = await axios.post('http://127.0.0.1:5000/api/admin/market-hours', marketHours, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
};
