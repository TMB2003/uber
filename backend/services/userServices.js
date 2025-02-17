const userModel = require('../models/userModel');

module.exports.createUser = async ({firstname, lastname, email, password}) => {
    if(!firstname || !email || !password) throw new Error('Please enter all required fields');
    const user = userModel({
        fullname: {firstname, lastname}, 
        email, 
        password
    });
    return user;
}