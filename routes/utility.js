var express = require('express');
var router = express.Router();
var others = require('../controller/utility');


router.get('/get/department', function (req, res, next) {
    next()

}, others.getDepartment)

router.post('/save/department', function (req, res, next) {
    next()

}, others.saveDepartment)


router.get('/get/chemist', function (req, res, next) {

    next()

}, others.getChemist)

router.post('/save/chemist', function (req, res, next) {
    next()

}, others.saveChemist)


module.exports = router;



