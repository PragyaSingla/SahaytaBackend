//var userMongo = require('../models/user_schema');
const { User, validate } = require("../models/user_schema");
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcrypt');
const config = require('../config/default.json');


exports.register = function (req, res, next) {

  var newUser = userMongo({
    username: req.body.username,
    password: req.body.password,
    emailId: req.body.emailId,
    admin: true
  });


  newUser.save(function (err) {
    if (err) {
      //throw err;
      res.json({ "status": err.code, "message": err.errmsg })
    }

    res.json({ "code": 200, "message": "User Created", "username": newUser.username, "id": newUser.id })
  })

}


exports.login = function (req, res, next) {


  // if (req.method.toLowerCase() != "post") {
  //   res.render("login.jade", { layout: false });
  // }
  // else {

  //   User.findOne({ username: req.body.username }, function (err, result) {
  //     if (err) console.log(err);

  //     if (result == null) {
  //       res.json({ "code": 403, "message": 'Invalid username or password' });
  //     }
  //     else {
  //       auth(result);
  //     }
  //   });

  //   function auth(userRes) {


  //     if (!(req.body.password == userRes.password)) {
  //       res.json({ "code": 403, "message": 'Invalid username or password' });
  //     } else {
  //       console.log(userRes._id);
  //       // user.update({ _id: userRes._id }, { '$set': { token: Date.now } });
  //       res.json({ "code": 200, "message": "Login Successfull", "username": userRes.username });
  //     }
  //   }
  // }

  User.findOne({ username: req.body.username }, function (err, user) {
    if (err) {
      //next(err);
      res.status(500).send('Server error');
    } else {

      if (!user) return res.status(404).send('User not found!');

      //const result = bcrypt.compareSync(req.body.password, user.password)
      const result = req.body.password == user.password
      if (!result) return res.status(401).send('Password not valid!');

      const expiresIn = 24 * 60 * 60;
      const accessToken = jwt.sign({ id: user._id }, config.myprivatekey, { expiresIn: expiresIn });
      res.status(200).send({ "username": user.username, "access_token": accessToken, "expires_in": expiresIn });

    }
  })
}



// async function authenticate({ username, password }) {

//   User.findOne({username: username }, function (err, userInfo) {
//     if (err) {
//       next(err);
//     } else {
//       console.log(password)
//       console.log(userInfo)
//       if (bcrypt.compareSync(password, userInfo.password)) {
//         const token = jwt.sign({ id: userInfo._id }, req.app.get('myprivatekey'), { expiresIn: '1h' });
//         res.json({ status: "success", message: "user found!!!", data: { user: userInfo, token: token } });
//       } else {
//         res.json({ status: "error", message: "Invalid email/password!!!", data: null });
//       }
//     }



//     // const user = userMongo.findOne(u => u.username === username && u.password === password);
//     // if (user) {
//     //   const token = jwt.sign({ sub: user.id }, config.myprivatekey);
//     //   const { password, ...userWithoutPassword } = user;
//     //   return {
//     //     ...userWithoutPassword,
//     //     token
//     //   };
//     // }
//   })
// }

// module.exports = { authenticate }