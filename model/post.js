const mongoose = require('mongoose');
const Post = mongoose.model('Post', {
    userId: {
        type: String
            // ref: 'User'
    },
    post: {
        type: String
    },
    image: {
        type: String
    },
    username: {
        type: String
    },
    location: {
        type: String
    },
    userImage: {
        type: String
    }
})
module.exports = Post