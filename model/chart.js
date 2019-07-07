const mongoose = require('mongoose');
const Chart = mongoose.model('Chart', {
    chart: {
        type: String
    },
    privacy: {
        type: String
    },
    date: {
        type: String
    }
})
module.exports = Chart