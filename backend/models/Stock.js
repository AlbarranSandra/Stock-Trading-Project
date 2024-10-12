const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    stockTicker: {
        type: String,
        required: true,
        unique: true
    },
    volume: {
        type: Number,
        required: true
    },
    initialPrice: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
}, { timestamps: true });

const Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
