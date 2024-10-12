// server.js

const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const cron = require('node-cron');

// Load environment variables from .env file
dotenv.config({ path: './.env' });

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Enable CORS (Cross-Origin Resource Sharing)
app.use(cors());

// Import routes
const authRoutes = require('./routes/authRoutes');     // Authentication routes
const stockRoutes = require('./routes/stockRoutes');   // Admin stock management routes
const tradeRoutes = require('./routes/tradeRoutes');   // Customer trading routes
const portfolioRoutes = require('./routes/portfolioRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const updateStockPrices = require('./utils/priceScheduler');
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes');
// Use routes
app.use('/api/auth', authRoutes);      // Routes for login and registration
app.use('/api/stocks', stockRoutes);   // Routes for stock management (admin)
app.use('/api/trades', tradeRoutes);
app.use('/api/user', userRoutes);    // Routes for buying/selling stocks (customer)

app.use('/api/admin', adminRoutes);
// Portfolio routes for customers
app.use('/api/portfolio', portfolioRoutes);

// Transaction routes for customers
app.use('/api/transactions', transactionRoutes);
// Schedule stock price updates every minute (only during market hours)
cron.schedule('* * * * *', async () => {
    // You can add market hours logic here if needed
    await updateStockPrices();
});
// Default route
app.get('/', (req, res) => {
    res.send('Stock Trading System API is running');
});
app.get('/api/portfolio/:userId', (req, res) => {
    const { userId } = req.params;
    Portfolio.findOne({ user: userId }, (err, portfolio) => {
        if (err || !portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.json(portfolio);
    });
});

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
