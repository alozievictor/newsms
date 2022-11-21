const mongoose = require('mongoose')

const sopSchema = new mongoose.Schema({
    itemOne : {
        type: String,
    },
    itemOnePrice : {
        type: Number,
    },
    itemTwo : {
        type: String,
    },
    itemTwoPrice : {
        type: Number,
    },
    itemThree : {
        type: String,
    },
    itemThreePrice : {
        type: Number,
    },
    itemFour : {
        type: String,
    },
    itemFourPrice : {
        type: Number,
    },
    itemFive : {
        type: String,
    },
    itemFivePrice : {
        type: Number,
    },
    addedDate : {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('allSop', sopSchema);