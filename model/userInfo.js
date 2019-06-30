const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    dob: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    country: {
        type: String
    },
    address: {

    },
    postalCode: {

    },
    degree: {

    },
    university: {

    },
    aboutMe: {

    }


});


const User = mongoose.model('User', UserSchema)
module.exports = User