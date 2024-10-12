const express = require('express');
const Stock = require('../models/Stock');
const auth = require('../middleware/auth');
const router = express.Router();

// Route for admin to create a new stock
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

// Route to change market hours
router.post('/market-hours', auth, async (req, res) => {
    const { openingTime, closingTime } = req.body;

    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied' });
        }

        // Update market hours in some global settings (not shown here, you'd store this in DB or env)
        const marketHours = {
            openingTime,
            closingTime
        };

        // Save/update market hours logic here (could be in DB)

        res.json({ message: 'Market hours updated', marketHours });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
