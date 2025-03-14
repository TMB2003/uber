import axios from 'axios';
const captainModel = require('../models/captianModel')

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            const location = response.data.results[0].geometry.location;
            return {
                lat: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error("Unable to fetch coordinates");
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            if (response.data.rows[0].elements[0].status === "ZERO_RESULTS") {
                throw new Error('No Routes Found');
            }

            return response.data.rows[0].elements[0];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const axios = require('axios');  // Ensure axios is imported

module.exports.getAutoSuggestions = async (address) => {
    if (!address) {
        throw new Error('Query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === "OK") {
            return response.data.predictions;
        } else {
            throw new Error("Unable to fetch suggestions");
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getCaptainInTheRadius = async (ltd, lng, radius) => {
    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ltd, lng], radius/ 6371]
            }
        }
    });

    return captains;
}