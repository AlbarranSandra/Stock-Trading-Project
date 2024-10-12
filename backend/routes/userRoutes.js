const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Portfolio = require('../models/Portfolio');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// Deposit Cash
router.post('/deposit', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.cashBalance += amount; // Increase cash balance
        await user.save();
        const portfolio = await Portfolio.findOne({ user: userId });
        if (portfolio) {
            portfolio.cashBalance += amount; // Increase portfolio cash balance
            await portfolio.save();
        }
        res.status(200).json({ message: 'Deposit successful', cashBalance: user.cashBalance });
    } catch (error) {
        console.error('Error during deposit:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Withdraw Cash
router.post('/withdraw', async (req, res) => {
    const { userId, amount } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.cashBalance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        user.cashBalance -= amount; // Decrease cash balance
        await user.save();
        // Update user's portfolio cash balance
        const portfolio = await Portfolio.findOne({ user: userId });
        if (portfolio) {
            portfolio.cashBalance -= amount; // Decrease portfolio cash balance
            await portfolio.save();
        }
        res.status(200).json({ message: 'Withdrawal successful', cashBalance: user.cashBalance });
    } catch (error) {
        console.error('Error during withdrawal:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router;
