// middleware/marketHours.js

const isMarketOpen = () => {
    const currentHour = new Date().getHours();
    const openingHour = 0; // Market opens at 9 AM
    const closingHour = 24; // Market closes at 4 PM

    return currentHour >= openingHour && currentHour <= closingHour;
};

const marketHoursMiddleware = (req, res, next) => {
    if (!isMarketOpen()) {
        return res.status(403).json({ message: 'Market is closed. Trades cannot be executed.' });
    }
    next();
};

module.exports = marketHoursMiddleware;
