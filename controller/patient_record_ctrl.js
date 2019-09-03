var patient_record = require('../models/patient_record_schema');

exports.savePatientRecord = function (req, res, next) {


    var patient = patient_record({
        sahayta_no: req.body.sahayta_no,
        department:req.body.department,
        date: req.body.date,
        cr_no: req.body.cr_no,
        rt_no: req.body.rt_no,
        reffered_by: req.body.reffered_by,
        patient_name: req.body.patient_name,
        patient_address: req.body.patient_address,
        age: req.body.age,
        gender: req.body.gender,
        diagnosis: req.body.diagnosis,
        expenditure: req.body.expenditure,
        medicine_advice: req.body.medicine_advice,
        treatment_type: req.body.treatment_type,
        total_cycles: req.body.total_cycles,
        cost_per_cycle: req.body.cost_per_cycle,
        chemist: req.body.chemist
    });

    patient.save(function (err, newPatient) {
        if (err) {
            //throw err;
            //res.send({ "status": err.code, "message": err.errmsg })
            res.status(500).json({
                message: err.message

            });
        }

        //res.send({ "code": 200, "message": "Record Saved" })
        res.status(200).json({ "message": "Record Saved successfully" });

    })

}

exports.getPatientInfo = function (req, res, next) {

    patient_record.find(function (err, result) {

        if (err) {
            res.status(500).json({
                message: err.message

            });
        }

        res.status(200).json({ data: result })
    })
}