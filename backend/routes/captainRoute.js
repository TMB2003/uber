const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
const captainController = require('../controllers/captainController');
const { authCaptain } = require('../middlewares/authMiddleware');

router.post('/register', [
    body('fullname').isLength({min: 3}).withMessage('Please enter a valid fullname'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
    body('vehicle.color').isLength({min: 3}).withMessage('Please enter a valid color'),
    body('vehicle.vehicleType').isLength({min: 3}).withMessage('Please enter a valid model'),
    body('vehicle.plate').isLength({min: 3}).withMessage('Please enter a valid plate'),
    body('vehicle.capacity').isLength({min: 3}).withMessage('Please enter a valid capacity'),    
] ,captainController.registerCaptain);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min: 6}).withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile',authCaptain, captainController.getCaptainProfile);

router.get('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;
