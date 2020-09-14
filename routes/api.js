const router = require('express').Router();

const User = require('../models/User.model');

router.post('/register', async (req, res) => {
    const user = new User({
        name: req.body.name,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        gender:req.body.gender,
        phoneNumber:req.body.phoneNumber,
        email:req.body.email
    });
    try{
        const saveUserDetails = await user.save();
        res.send(saveUserDetails);
    }catch(e){
        res.status(400).send(e);
        console.log(`unable to save userDetails ${e}`);
    }
});

module.exports = router;