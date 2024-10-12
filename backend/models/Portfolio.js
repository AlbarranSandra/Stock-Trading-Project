const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cashBalance: {
        type: Number,
        default: 0
    },
    stocks: [
        {
            stock: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Stock',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }
    ]
}, { timestamps: true });

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
