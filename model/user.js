const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
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
    image: {
        type: String
    },
    userType: {
        type: String
    },
    address: {
        type: String
    },
    city: {
        type: String
    },
    postal: {
        type: String
    },
    academics: {
        type: String
    },
    degree: {
        type: String
    },
    university: {
        type: String
    },
    aboutMe: {
        type: String
    },
    status: {
        type: String
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
});

UserSchema.statics.checkCrediantialsDb = async(email, password) => {
    const validateUser = await User.findOne({ email: email, password: password })
    return validateUser;
}

UserSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'usertoken')
    console.log(token);
    // console.log(user._id)
    user.tokens = user.tokens.concat({ token: token })
    await user.save()
    return token
}

const User = mongoose.model('User', UserSchema)
module.exports = User