const express = require('express');
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');
const router = express.Router();

// Route to get the user's transaction history
router.get('/history', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.userId }).populate('stock', 'companyName stockTicker');
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
