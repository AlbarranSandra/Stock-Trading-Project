const express = require('express');
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');
const router = express.Router();

// Admin route to create a stock
router.post('/create', auth, async (req, res) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { companyName, stockTicker, volume, initialPrice } = req.body;
    try {
        const stock = new Stock({ companyName, stockTicker, volume, initialPrice, currentPrice: initialPrice });
        await stock.save();
        res.json({ message: 'Stock created successfully', stock });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.get('/all', auth, async (req, res) => {
    try {
        const stocks = await Stock.find();
        res.json(stocks);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
