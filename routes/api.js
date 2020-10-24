const router = require("express").Router();

const User = require("../models/User.model");
const { registerValidation } = require("../validation");

router.get('/data', (req, res) => {
  res.send('I am Working properly ...');
})

router.post("/register", async (req, res) => {
  //Validate the data with joi before send it to the database
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = new User({
    name: req.body.name,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    gender: req.body.gender,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email,
  });
  try {
    const saveUserDetails = await user.save();
    res.send(saveUserDetails);
  } catch (e) {
    res.status(400).send(e);
    console.log(`Unable to save userDetails ${e}`);
  }
});

module.exports = router;
