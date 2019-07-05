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
    }
})
module.exports = Post