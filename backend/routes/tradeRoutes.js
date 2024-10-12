const express = require('express');
const Stock = require('../models/Stock');
const Portfolio = require('../models/Portfolio');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const router = express.Router();
const marketHoursMiddleware = require('../middleware/marketHours');
// Route to buy stock
router.post('/buy', auth, marketHoursMiddleware, async (req, res) => {
    const { stockId, quantity } = req.body;
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        const userPortfolio = await Portfolio.findOne({ user: req.user.userId });
        const totalCost = stock.currentPrice * quantity;

        // Check if the user has enough cash
        if (userPortfolio.cashBalance < totalCost) {
            return res.status(400).json({ message: 'Insufficient cash balance' });
        }

        // Deduct cost and update portfolio
        userPortfolio.cashBalance -= totalCost;

        const stockIndex = userPortfolio.stocks.findIndex(s => s.stock.toString() === stockId);
        if (stockIndex >= 0) {
            userPortfolio.stocks[stockIndex].quantity += quantity;
        } else {
            userPortfolio.stocks.push({ stock: stockId, quantity });
        }

        await userPortfolio.save();

        // Create transaction record
        const transaction = new Transaction({
            user: req.user.userId,
            stock: stockId,
            type: 'buy',
            quantity,
            price: stock.currentPrice
        });
        await transaction.save();

        res.json({ message: 'Stock bought successfully', portfolio: userPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Route to sell stock
router.post('/sell', auth, marketHoursMiddleware, async (req, res) => {
    const { stockId, quantity } = req.body;
    try {
        const stock = await Stock.findById(stockId);
        if (!stock) {
            return res.status(404).json({ message: 'Stock not found' });
        }

        const userPortfolio = await Portfolio.findOne({ user: req.user.userId });
        const stockInPortfolio = userPortfolio.stocks.find(s => s.stock.toString() === stockId);

        if (!stockInPortfolio || stockInPortfolio.quantity < quantity) {
            return res.status(400).json({ message: 'Insufficient stock quantity in portfolio' });
        }

        const totalRevenue = stock.currentPrice * quantity;

        // Update portfolio and cash balance
        stockInPortfolio.quantity -= quantity;
        if (stockInPortfolio.quantity === 0) {
            userPortfolio.stocks = userPortfolio.stocks.filter(s => s.stock.toString() !== stockId);
        }

        userPortfolio.cashBalance += totalRevenue;
        await userPortfolio.save();

        // Create transaction record
        const transaction = new Transaction({
            user: req.user.userId,
            stock: stockId,
            type: 'sell',
            quantity,
            price: stock.currentPrice
        });
        await transaction.save();

        res.json({ message: 'Stock sold successfully', portfolio: userPortfolio });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
