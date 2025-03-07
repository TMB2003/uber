const captainModel = require('../models/captainModel');

module.exports.createCaptain = async ({ firstname, lastname, email, password, color, plate, capacity, vehicleType }) => {
    if (!firstname || !lastname || !email || !password || !color || !plate || !capacity || !vehicleType) {
        throw new Error('Please enter all required fields');
    }

    const captain = await captainModel.create({  // ✅ Added `await`
        fullname: { firstname, lastname },
        email,
        password,
        vehicle: { color, plate, capacity, vehicleType }
    });

    return captain;
};
