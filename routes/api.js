const router = require("express").Router();
var bcrypt = require('bcryptjs');
const User = require("../models/User.model");
// const { registerValidation } = require("../src/validation");

router.get('/data', (req, res) => {
  res.send('I am Working properly ...');
})

router.post("/register", async (req, res) => {
  //Validate the data with joi before send it to the database
  
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(req.body.password, salt, function(err, hash) {
      var newUser = new User({
        name: req.body.name,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        gender: req.body.gender,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        password: hash
      });

      newUser.save(function(err) {
        if(!err) {
          return res.send({ status: 'User created',newUser });
        } else {
          if(err.name == 'ValidationError') {
            res.statusCode = 400;
            res.send({ error: 'Bad Request' });
          } else {
            res.statusCode = 500;
            res.send({ error: 'Internal Server Error' });
          }
        } 
      });
    });
  });
});

module.exports = router;
