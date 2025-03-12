const rideModel = require('../models/rideModel');
const { sendMessageToSocketId } = require('../socket');
const mapService = require('./mapService')

async function getFare(pickup, destination){
    
    if(!pickup || !destination){
        throw new Error('Pickup and Destination are required')
    }

    const distanceTime = await mapService.getDistanceTime(pickup, destination); 
    if (!distanceTime || typeof distanceTime.distance !== 'number' || typeof distanceTime.time !== 'number') {
        throw new Error('Failed to fetch distance and time from map service');
    }

    const baseFare = {
        auto: 30,
        car: 50,
        moto: 20
    };

    const perKmRate = {
        auto: 10,
        car: 15,
        moto: 8
    };

    const perMinuteRate = {
        auto: 2,
        car: 3, 
        moto: 1.5
    };

    const fare = {
        auto: Math.round(baseFare.auto + ((distanceTime.distance.value/1000)* perKmRate.auto) + ((distanceTime.duration.value/60) * perMinuteRate.auto)),
        car: Math.round(baseFare.car + ((distanceTime.distance.value/1000) * perKmRate.car) + ((distanceTime.duration.value/60) * perMinuteRate.car)),
        moto: Math.round(baseFare.moto + ((distanceTime.distance.value/1000) * perKmRate.moto) + ((distanceTime.duration.value/60) * perMinuteRate.moto)),
    }

    return fare;
}

module.exports.getFare = getFare;

function getOtp(num){
    function generateOtp(num){
        const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num)).toString();
        return otp;
    }

    return generateOtp(num);
}

module.exports.createRide = async ({
    user, pickup, destination, vehicleType
}) => {
    if(!user || !pickup || !destination || !vehicleType){
        throw new Error('Please enter all required fields');
    }
    const fare = await getFare(pickup, destination);
    const ride = await rideModel.create({
        user, 
        pickup, 
        destination, 
        vehicleType,
        otp: getOtp(6), 
        fare: fare[vehicleType]
    });
    
    return ride;
}

module.exports.confirmRide = async ({ rideId, captain }) => {
    if(!rideId){
        throw new Error('Ride id is required');
    }

    await rideModel.findOneAndUpdate({
        _id : rideId
    }, {
        status: 'accepted',
        captain: captain._id
    })

    const ride = await rideModel.findOne({
        _id: rideId
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    return ride;
}

module.exports.startRide = async ({ rideId, otp, captain }) => {
    if(!rideId || !otp){
        throw new Error('Ride id and OTP are required');
    }

    const ride = await rideModel.findOne({ 
        _id: rideId 
    }).populate('user').populate('captain').select('+otp');
    
    if( ride.staus != 'accepted'){
        throw new Error ('Ride not Accepted');
    }

    if( ride.otp != otp){
        throw new Error ('OTP is not Valid');
    }

    await rideModel.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'ongoing'
    })

    sendMessageToSocketId(ride.user.socketId, {
        event: 'ride-started',
        data: ride
    })

    return ride;
}

module.exports.endRide = async ({rideId, captain}) => {
    if( !rideId ){
        throw new Error('Ride id is required');
    }

    const ride = await rideModel.findOne({
        _id: rideId,
        captain: captain._id
    }).populate('user').populate('captain').select('+otp');

    if(!ride){
        throw new Error('Ride not found');
    }

    if( ride.status != 'ongoing'){
        throw new Error('Ride not ongoing');
    }

    await rideMode.findOneAndUpdate({
        _id: rideId
    }, {
        status: 'completed'
    })

    return ride;
}