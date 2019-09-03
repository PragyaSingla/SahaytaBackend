const chemist = require('../models/chemist')
const department = require('../models/department')

exports.saveDepartment = function (req, res, next) {

    var departmentObj = department({
        name: req.body.name,
        hospital:req.body.hospital
    })

    departmentObj.save(function (err, newPatient) {
        if (err) {
            //throw err;
            //res.send({ "status": err.code, "message": err.errmsg })
            res.status(500).json({
                message: err.message
            });
        }

        //res.send({ "code": 200, "message": "Record Saved" })
        res.status(200).json({"message": "Department saved successfully" });

    })

}

exports.saveChemist = function (req, res, next) {

    var chemistObj = chemist({
        name: req.body.name,
        hospital:req.body.hospital
    })

    chemistObj.save(function (err, newPatient) {
        if (err) {
           
            res.status(500).json({
                message: err.message
            });
        }

        //res.send({ "code": 200, "message": "Record Saved" })
        res.status(200).json({"message": "Chemist saved successfully" });

    })

}



exports.getChemist = function (req, res, next) {

    chemist.find(function (err, result) {

        if (err) res.status(500).json({message:err.message})


        res.status(200).json({data:result})
    })
}

exports.getDepartment = function (req, res, next) {

    department.find(function (err, result) {

        if (err) res.status(500).json({message:err.message})

        res.status(200).json({data:result})
    })
}