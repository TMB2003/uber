const captainModel = require('../models/captianModel')
const captainService = require('../services/captainService');
const blacklistedToken = require('../models/blacklistTokenModel');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {fullname, email, password, vehicle} = req.body;

    const captainExists = await captainModel.findOne({email});
    if(captainExists) return res.status(400).json({message: 'Captain already exists'});

    const hashedPassword = await captainService.hashPassword(password);

    const captain = await captainService.createCaptain({...fullname, email, password: hashedPassword, ...vehicle});
    
    const token = await captainService.generateToken(captain);

    res.status(201).json({token});
}

module.exports.loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    const captain = await captainModel.findOne({email}).select('+password');
    if(!captain) return res.status(404).json({message: 'Captain not found'});

    const isMatch = await captainService.comparePassword(password, captain.password);
    if(!isMatch) return res.status(401).json({message: 'Invalid Email or Password'});

    const token = await captainService.generateToken(captain);

    res.cookie('token', token);
    
    res.status(200).json({token, captain});
}

module.exports.getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    const blacklisted = await blacklistedToken.create({token});
    if(!blacklisted) return res.status(400).json({message: 'Unable to logout'});
    
    res.clearCookie('token');
    
    res.status(200).json({message: 'Captain logged out successfully'});
}