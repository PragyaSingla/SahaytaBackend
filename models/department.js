const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    id: { type: Number, default: 0, auto: true },
    name: { type: String },
    hospital: { type: String }
})

module.exports = mongoose.model('Department', departmentSchema)