var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

var loginRoute = require('./user_rou');
var patientRecordRoute = require('./patient_record_rou');
var otherRoute = require('./utility')

router.use("/api/users",loginRoute);
router.use("/api/patient",patientRecordRoute);
router.use("/api",otherRoute);


module.exports = router;
