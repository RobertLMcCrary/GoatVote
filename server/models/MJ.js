//MJ.js
const mongoose = require('mongoose')
const { Schema } = mongoose

const MJschema = new Schema({
    votes: {
        type: Number,
        required: true
    }
})

const MJModel = mongoose.model('MJ', MJschema)
module.exports = MJModel