import axios from 'axios';

const token = localStorage.getItem('token');


export const fetchTransactionHistory = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/api/transactions/history', {
            headers: { Authorization: `Bearer ${token}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw error;
    }
};
