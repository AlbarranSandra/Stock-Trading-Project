const express = require('express');
const Portfolio = require('../models/Portfolio');
const auth = require('../middleware/auth');
const router = express.Router();


router.get('/me', auth, async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ user: req.user.userId }).populate('stocks.stock', 'companyName stockTicker currentPrice');
        if (!portfolio) {
            return res.status(404).json({ message: 'Portfolio not found' });
        }
        res.json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;
