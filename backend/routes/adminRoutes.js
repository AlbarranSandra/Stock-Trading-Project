const express = require('express');
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/stocks', auth, async (req, res) => {
    const { companyName, stockTicker, initialPrice, volume } = req.body;

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const newStock = new Stock({
            companyName,
            stockTicker,
            initialPrice,
            currentPrice: initialPrice,
            volume
        });

        await newStock.save();

        res.json({ message: 'Stock created successfully', stock: newStock });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.post('/market-hours', auth, async (req, res) => {
    const { openingTime, closingTime } = req.body;

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        const marketHours = {
            openingTime,
            closingTime
        };

        res.json({ message: 'Market hours updated', marketHours });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
