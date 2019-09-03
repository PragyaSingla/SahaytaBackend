const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
var mongoose = require('mongoose');
let validator = require('validator')
var passportLocalMongoose = require("passport-local-mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// const bcrypt = require("bcrypt");

// // Generate Password
// const saltRounds = 10
// const myPlaintextPassword = 'my-password'
// const salt = bcrypt.genSaltSync(saltRounds)
// const passwordHash = bcrypt.hashSync(myPlaintextPassword, salt)



var UserSchema = mongoose.Schema({
    username: {
        type: String, required: true, unique: true, minlength: 3,
        maxlength: 50
    },
    password: {
        type: String, required: true, minlength: 3,
        maxlength: 255
    },
    isAdmin: Boolean,
    emailId: {
        type: String,
        validate: (value) => {
            return validator.isEmail(value);
        }
    },
    department: {type:String},
    created_at: Date,
    updated_at: Date
})

//custom method to generate authToken 
UserSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id, isAdmin: this.isAdmin }, config.get('myprivatekey')); //get the private key from the config file -> environment variable
    return token;
}

//function to validate user 
function validateUser(user) {
    const schema = {
        username: Joi.string().min(3).max(50).required(),
        emailId: Joi.string().min(5).max(255).email(),
        password: Joi.string().min(3).max(255).required()
    };

    return Joi.validate(user, schema);
}




// userSchema.plugin(uniqueValidator);

// //userSchema.plugin(passportLocalMongoose);

// userSchema.methods.validPassword = function (user, password) {
//     return password == user.password
//    // return bcrypt.compareSync(password, user.password)

// };

const User = mongoose.model('User', UserSchema);

exports.User = User;
exports.validate = validateUser;
//module.exports = mongoose.model('User', userSchema)