const Captain = require('../models/captianModel');
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blacklistTokenModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports.registerCaptain = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;

        if (!fullname?.firstname || !fullname?.lastname) {
            return res.status(400).json({ message: 'Firstname and Lastname are required' });
        }

        // Check if captain already exists
        const captainExists = await Captain.findOne({ email });
        if (captainExists) return res.status(400).json({ message: 'Captain already exists' });

        // Hash password securely
        const hashedPassword = await Captain.hashPassword(password);

        // Save captain to database
        const newCaptain = new Captain({
            fullname,
            email,
            password: hashedPassword,
            vehicle
        });

        await newCaptain.save();

        // Generate auth token
        const token = newCaptain.generateAuthToken();

        res.status(201).json({ captain: newCaptain, token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.loginCaptain = async (req, res) => {
    try {
        const { email, password } = req.body;

        const captain = await Captain.findOne({ email }).select('+password');
        if (!captain) return res.status(404).json({ message: 'Captain not found' });

        const isMatch = await captain.comparePassword(password);
        if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

        const token = captain.generateAuthToken();
        res.cookie('token', token);

        res.status(200).json({ captain, token });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.getCaptainProfile = async (req, res) => {
    try {
        console.log("Captain Profile Request Received");
        console.log("Captain ID:", req.captain?._id); // Debugging

        const captain = await Captain.findById(req.captain._id).select('-password');
        if (!captain) return res.status(404).json({ message: "Captain not found" });

        res.status(200).json(captain);
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};

module.exports.logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if (!token) return res.status(400).json({ message: 'No token provided' });

        // Check if token is already blacklisted
        const isBlacklisted = await BlackListToken.findOne({ token });
        if (isBlacklisted) return res.status(400).json({ message: "Token already blacklisted" });

        // Verify token before blacklisting
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        // Blacklist token
        await BlackListToken.create({ token });

        // Clear token from cookies (only if stored in cookies)
        if (req.cookies.token) {
            res.clearCookie('token', { httpOnly: true, secure: true, sameSite: 'Strict' });
        }

        res.status(200).json({ message: 'Captain logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};
