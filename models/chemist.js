const mongoose = require('mongoose');

const chemistSchema = mongoose.Schema({
    id: { type: Number, default: 0, auto: true },
    name: { type: String },
    address: { type: String }
})

module.exports = mongoose.model('Chemist', chemistSchema)