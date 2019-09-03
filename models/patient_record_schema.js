var mongoose = require('mongoose');

var patientRecordSchema = mongoose.Schema({
    sahayta_no: { type: Number, required: true, unique: true },
    department:{type: Number},
    date: { type: Date, required: true },
    cr_no: { type: String, required: true },
    rt_no: { type: String, required: true },
    reffered_by: { type: String, required: true },
    patient_name: { type: String, required: true },
    patient_address: { type: String },
    age: { type: Number },
    gender: String,
    diagnosis: String,
    expenditure: Number,
    medicine_advice: String,
    treatment_type: String,
    total_cycles: Number,
    cost_per_cycle: Number,
    chemist: Number,
    created_at: Date,
    updated_at: Date
})

module.exports = mongoose.model('PatientRecord', patientRecordSchema)