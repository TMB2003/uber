const jwt = require('jsonwebtoken');
const BlackListToken = require('../models/blacklistTokenModel');
const userModel = require('../models/userModel');
const captainModel = require('../models/captianModel');

// Generic Authentication Middleware
const authenticate = (role) => async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        console.log("Extracted Token:", token); // Debugging

        if (!token) return res.status(401).json({ message: 'Unauthorized: No token provided' });

        const blacklistedToken = await BlackListToken.findOne({ token });
        if (blacklistedToken) return res.status(401).json({ message: 'Unauthorized: Token blacklisted' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const model = role === 'captain' ? captainModel : userModel;

        const account = await model.findById(decoded._id);
        if (!account) return res.status(404).json({ message: `${role.charAt(0).toUpperCase() + role.slice(1)} not found` });

        req[role] = account;
        console.log(`Authenticated ${role}:`, req[role]); // Debug log
        next();
    } catch (error) {
        console.error("Auth Error:", error);
        res.status(401).json({ message: 'Unauthorized: Invalid token', error: error.message });
    }
};

module.exports.authUser = authenticate('user');
module.exports.authCaptain = authenticate('captain');
