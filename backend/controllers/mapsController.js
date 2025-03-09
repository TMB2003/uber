const mapsService = require('../services/mapService');
const { validationResult } = require('express-validator');

module.exports.getCoordinates = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    try {
        const coordinates = await mapsService.getAddressCoordinate(address);
        res.status(200).json(coordinates);
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "Coordinates not found" });
    }
};

module.exports.getDistanceTime = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { origin, destination } = req.query;

    try {
        const distanceTime = await mapsService.getDistanceTime(origin, destination);
        res.status(200).json(distanceTime);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching distance and time" });
    }
};

module.exports.getAutoSuggestions = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { address } = req.query;

    if (!address || address.trim() === "") {
        return res.status(400).json({ message: "Address is required" });
    }

    try {
        const suggestions = await mapsService.getAutoSuggestions(address);
        res.status(200).json(suggestions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
