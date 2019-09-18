const auth = require("../middleware/auth");
//const bcrypt = require("bcrypt");
const { User, validate } = require("../models/user_schema");

var express = require('express');
var router = express.Router();
var user = require('../controller/user_ctrl');

router.get("/current", auth, async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
})

router.post('/signup', async (req, res) => {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    let user = await User.findOne({ username: req.body.username });
    if (user) return res.status(400).send("User already registered.");

    user = new User({
        username: req.body.username,
        password: req.body.password,
        emailId: req.body.emailId,
        department: req.body.department
    });

   // user.password = await bcrypt.hash(user.password, 10);
   user.password = user.password
    await user.save();

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        _id: user._id,
        username: user.username,
        emailId: user.emailId
    });

});

router.post('/signin', function (req, res, next) {

    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    next();
}, user.login);


function authenticate(req, res, next) {
    user.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

module.exports = router;