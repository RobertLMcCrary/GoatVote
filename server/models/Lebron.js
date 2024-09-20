//Lebron.js
const mongoose = require('mongoose')
const { Schema } = mongoose

const lebronSchema = new Schema({
    votes: {
        type: Number,
        required: true
    }
})

const LebronModel = mongoose.model('Lebron', lebronSchema)
module.exports = LebronModel