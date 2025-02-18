const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    const blacklistedToken = await BlackListToken.findOne({token});
    if(blacklistedToken) return res.status(401).json({message: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user) return res.status(404).json({message: 'User not found'});
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'});
    }
}

module.exports.authCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({message: 'Unauthorized'});

    const blacklistedToken = await BlackListToken.findOne({token});
    if(blacklistedToken) return res.status(401).json({message: 'Unauthorized'});

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);
        if(!captain) return res.status(404).json({message: 'Captain not found'});
        req.captain = captain;
        next();
    } catch (error) {
        res.status(401).json({message: 'Unauthorized'});
    }
}