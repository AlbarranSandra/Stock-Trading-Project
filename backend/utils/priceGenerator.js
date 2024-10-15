const randomPriceChange = (currentPrice) => {
    const changePercentage = (Math.random() * 2 - 1) * 0.02; // random percentage change between -2% and +2% , we can change to 0.10 also
    const newPrice = currentPrice * (1 + changePercentage);
    return Math.max(0.01, newPrice.toFixed(2)); // Ensure price doesn't fall below 0.01
};

module.exports = randomPriceChange;
