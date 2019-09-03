var express = require('express');
var router = express.Router();
const checkAuth = require('../middleware/auth')
var patient = require('../controller/patient_record_ctrl');


router.post('/save',checkAuth, function (req, res, next) {
    next()

}, patient.savePatientRecord)


router.get('/get',checkAuth, function (req, res, next) {
    next()
}, patient.getPatientInfo)

module.exports = router;

