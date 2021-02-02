const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../middleware/auth");
const User = require("../models/User.model");

router.post(
  "/register",
  [
    check("firstname", "Please Enter your firstname").not().isEmpty(),
    check("gender","Please enter your gender").isLength({max:7}),
    check("lastname","Please enter your lastname").isLength(),
    check("email", "Please enter a valid email").isEmail(),
    check("phonenumber","Please enter a valid mobile").not().isEmpty(),
    check("password", "Please enter a valid password").isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { firstname,lastname,gender,phonenumber, email, password, compte, wdeposit } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          msg: "User Already Exists"
        });
      }

      user = new User({
        email,
        password,
        firstname,
        lastname,
        gender,
        phonenumber,
        compte,
        wdeposit
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        "randomString",
        { expiresIn: 10000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Error in Saving");
    }
  }
);

// ###################################################################################

router.post(
  "/login",
  [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({min: 6})
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({
          message: "User Not Exist"
        });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({
          message: "Incorrect Password !"
        });

      const payload = {
        user: { id: user.id }
      };

      jwt.sign(
        payload,
        "randomString",
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({
            token
          });
        }
      );
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
  }
);

// ###################################################################################

router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({ message: "Error in Fetching user" });
  }
});

// ###################################################################################

router.post('/envoyer', async (req, res) => {
  
  const { sender, receiver , montant } = req.body;
  if(!sender || !receiver || !montant) {
    return res.status(400).json('Le compte ou le montant ne doit pas etre vide');
  } 

  try {
    // check sender account
    const userSender = await User.findOne({ compte: sender });
    if(!userSender){
      return res.status(400).json(`Envoi: Ce compte: ${ sender } n'existe pas `);
    }else{
      
      // get the sender solde
      let soldeSender = userSender.wdeposit;
      console.log(`compte ${ sender } : ${ soldeSender }`);

      const userReceiver = await User.findOne({ compte: receiver});
      if(!userReceiver){
        return res.status(400).json(`Reception: Ce compte ${ receiver } n'existe pas`);
      }else{

        // check the receiver solde
        let soldeReceiver = userReceiver.wdeposit;
        console.log(`compte ${ receiver } : ${ soldeReceiver }`);

        console.log(`le montant à envoyer vaut ${montant}`);
        
        // solde sender
        let newSoldeSender = soldeSender - montant;

        // update the sender data 
        const updateSenderData = await User.findOneAndUpdate({ compte : sender }, 
          {$set: { wdeposit: newSoldeSender} },
          {new: true});

        //solde receiver
        let newSoldeReceiver = soldeReceiver + montant

        // update the receiver data
        const updateReceiverData = await User.findOneAndUpdate({ compte : receiver }, 
          {$set: { wdeposit: newSoldeReceiver} },
          {new: true});

        res.json({
          senderData: updateSenderData,
          receiverData: updateReceiverData
        });
      }
        
      
      
    }         
  } catch (error) {
    console.log('erreur: ', error)
    return res.status(400).json({msg: error});
  }
    
});

// ###################################################################################

router.post('/retirer', async (req, res) => {
  
  const { compte , montant } = req.body;
  if(!compte || !montant) {
    res.status(400).json('Le compte ou le montant ne doit pas etre vide')
  }
  console.log(`le montant à retirer vaut ${montant}`);
  
  await User.findOne({ compte })
    .then(user_found =>{
        if(!user_found){
          res.status(400).json(`Ce compte: ${compte} n'existe pas `);
        }else{

          let solde = user_found.wdeposit;
          let newSolde = solde - montant;

          User.findOneAndUpdate({ compte : compte }, 
            {$set: { wdeposit: newSolde} },
            {new: true} ,(err, result) => {
              if(err) throw err;
              console.log(user_found.wdeposit)
              res.json(result);
          });
        }            
    })      
    .catch(err => res.status(400).json({message: err}));
});

module.exports = router;