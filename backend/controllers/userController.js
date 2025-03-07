const userModel = require('../models/userModel');
const userService = require('../services/userServices')
const { validationResult } = require('express-validator');
const BlackListToken = require('../models/blacklistTokenModel');
const bcrypt = require('bcrypt');


module.exports.registerUser = async (req, res, next) => {
    try {
        const error = validationResult(req);
        if (!error.isEmpty()) {
            return res.status(400).json({ errors: error.array() });
        }

        const { fullname, email, password } = req.body;
        console.log("Received user data:", fullname, email, password); // Debugging

        // Check if user already exists
        const userExists = await userModel.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);  // Ensure correct hashing

        // Save user to database
        const user = new userModel({
            fullname: {
                firstname: fullname.firstname,
                lastname: fullname.lastname,
            },
            email,
            password: hashPassword,  // <-- Store hashed password here
        });

        await user.save();

        // Generate auth token
        const token = user.generateAuthToken();
        
        console.log("User successfully registered:", user); // Debugging

        // Send response
        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Error saving user:", error); // Debugging
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


module.exports.loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({ email }).select('+password');    
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid Email or Password' });

    const token = user.generateAuthToken();
    res.cookie('token', token);

    res.status(200).json({ user, token });
};

module.exports.getUserProfile = async (req, res, next) => {
    res.status(200).json(req.user);
}

module.exports.logoutUser = async (req, res, next) => {
    res.clearCookie('token');
    const token = req.cookies.token || req.headers.authorization.split(' ')[1];

    await BlackListToken.create({ token });

    res.status(200).json({ message: 'Logged out successfully' });
}