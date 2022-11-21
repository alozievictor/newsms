const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    studentId : {
        type: String,
        required: true
    },
    nin : {
        type: Number,
        required: true
    },
    intId : {
        type: Number,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique:true
    },
    department : {
        type: String,
        required: true
    },
    programme : {
        type: String,
        required: true
    },
    intake : {
        type: String,
        required: true
    },
    status : {
        type: String,
        required: true
    },
    addedDate : {
        type: Date,
        required: true,
        default: Date.now()
    }
})

module.exports = mongoose.model('allStudent', studentSchema);