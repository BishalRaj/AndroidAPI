const mongoose = require('mongoose');
const User = mongoose.model('User', {
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
    }
})
module.exports = User