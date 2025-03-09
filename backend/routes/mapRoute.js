const express = require('express');
const router = express.Router();
const mapsController = require('../controllers/mapsController')
const authMiddleware = require('../middlewares/authMiddleware');
const {query} = require('express-validator');
const {getCoordinates, getDistanceTime} = require('../controllers/mapsController')

router.get('/get-coordinates', 
    query('address').isString().isLength({ min:3 }),
    authMiddleware.authUser, mapsController.getCoordinates)

router.get('/get-distance-time', 
    query('origin').isString().isLength({min:3}),
    query('destination').isString().isLength({min:3}),
    authMiddleware.authUser, mapsController.getDistanceTime
)

router.get('/get-suggestions',
    query('address').isString().isLength({min:3}),
    authMiddleware.authUser, mapsController.getAutoSuggestions
)

module.exports = router;