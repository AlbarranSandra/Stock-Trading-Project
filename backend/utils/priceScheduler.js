const Stock = require('../models/Stock');
const randomPriceChange = require('./priceGenerator');

const updateStockPrices = async () => {
    try {
        const stocks = await Stock.find({});
        stocks.forEach(async (stock) => {
            stock.currentPrice = randomPriceChange(stock.currentPrice);
            await stock.save();
        });
        console.log('Stock prices updated');
    } catch (error) {
        console.error('Error updating stock prices:', error);
    }
};

module.exports = updateStockPrices;
