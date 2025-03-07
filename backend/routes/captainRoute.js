const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const captainController = require('../controllers/captainController');
const { authCaptain } = require('../middlewares/authMiddleware');

router.post('/register', [
    body('fullname.firstname')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Firstname must be at least 3 characters long'),
    
    body('fullname.lastname')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Lastname must be at least 3 characters long'),
    
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email'),
    
    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),

    body('vehicle.color')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Please enter a valid color'),

    body('vehicle.vehicleType')
        .isIn(['car', 'motorcycle', 'auto'])
        .withMessage('Please enter a valid vehicle type'),

    body('vehicle.plate')
        .trim()
        .isLength({ min: 3 })
        .withMessage('Please enter a valid plate'),

    body('vehicle.capacity')
        .isInt({ min: 1 })
        .withMessage('Capacity must be a positive integer'),
], captainController.registerCaptain);

router.post('/login', [
    body('email')
        .trim()
        .isEmail()
        .withMessage('Please enter a valid email'),

    body('password')
        .trim()
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
], captainController.loginCaptain);

router.get('/profile', authCaptain, captainController.getCaptainProfile);
router.get('/logout', authCaptain, captainController.logoutCaptain);

module.exports = router;
