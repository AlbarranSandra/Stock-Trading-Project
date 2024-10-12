const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        req.user = {
            userId: user._id,
            role: user.role,
            username: user.username
        };
        next();
    } catch (error) {
        res.status(401).json({ message: 'Not authorized' });
    }
};

module.exports = auth;
