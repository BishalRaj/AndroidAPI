const mongoose = require('mongoose');
const Login = mongoose.model('Login', {
    userId: {
        type: String
    },
    success: {
        boolean: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    logoutTime: {
        type: String
    }
})
module.exports = Login