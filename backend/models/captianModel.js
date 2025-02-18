const mongoose = require('mongoose');

const CaptainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            required: true,
            minlength: [3, 'Firstname must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [ /^\S+@\S+\.\S+$/, "Please Enter valid Email"]
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type: String,
    },
    status:{
        type: String,
        enum: ['active', 'inactive'],
        default: 'active',
    },
    vehicle: {
        color:{
            type: String,
            required: true,
            minlength: [3, "Color Must be more than 3 characters long"]
        },
        plate: {
            type: String,
            required: true,
            minlength: [3, "Plate Must be more than 3 characters long"] 
        },
        capacity: {
            type: Number,
            required: true,
            minlength: [1, "Capacity must be more than 1"]
        },
        vehicleType: {
            type: String,
            required: true,
            enum: ['car', 'motorcycle', 'auto']
        }
    },
    location:{
        lat:{
            type: Number,
        },
        lng: {
            type: Number,
        }
    }
})

CaptainSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

const captainModel = mongoose.model('captain', captainSchema);

module.exports = captainModel;