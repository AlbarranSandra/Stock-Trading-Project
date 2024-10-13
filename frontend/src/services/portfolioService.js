import axios from 'axios';

// Utility function to get token
const getToken = () => localStorage.getItem('token');

export const fetchPortfolioById = async () => {
    const token = getToken(); // Retrieve token inside the function
    try {
        const response = await axios.get(`http://127.0.0.1:5000/api/portfolio/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching portfolio:', error); // Log the full error
        throw new Error(error.response?.data?.message || 'Error fetching portfolio');
    }
};

export const deposit = async (amount) => {
    const token = getToken(); // Retrieve token inside the function
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/deposit', { amount }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error during deposit:', error); // Log the full error
        throw new Error(error.response?.data?.message || 'Error during deposit');
    }
};



export const withdraw = async (amount) => {
    const token = getToken(); // Retrieve token inside the function
    try {
        const response = await axios.post('http://127.0.0.1:5000/api/user/withdraw', { amount }, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        console.error('Error during withdrawal:', error); // Log the full error
        throw new Error(error.response?.data?.message || 'Error during withdrawal');
    }
};
