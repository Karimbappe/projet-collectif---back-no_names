const router = require("express").Router();

//doit avoir le model pour pouvoir le poster
const User = require("../models/User");

//pour hasher
const CryptoJS = require("crypto-js");

//pour les tokens
const jwt = require("jsonwebtoken")

const express = require("express");
const cors = require("cors");
router.use(express.json())
//REGISTER
router.post("/register", (req, res) => {

    User.find({ email: req.body.email })
      .exec()
      .then(user => {
        if (user.length >= 1) {
            console.log({ email: req.body.email })
          return res.status(409).json({
            message: "Mail exists"
          });
        } else {

              const user = new User({
                username: req.body.username,
                email: req.body.email,
                password: CryptoJS.AES.encrypt(req.body.password, "secret").toString()
});
              user
                .save()
                .then(result => {
                  console.log(result);
                  res.status(201).json({
                   result
                  });
                })
                .catch(err => {
                  console.log(err);
                  res.status(500).json({
                    error: err
                  });
                });
            
          ;
        }}
        )
      }
      );
//Login

router.post("/login", async (req, res) => {
   try{

    const user = await User.findOne({email: req.body.email})
    !user && res.status(401).json("wrong email")
    
    const hashedPassword = CryptoJS.AES.decrypt(user.password,"secret")
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)
    originalPassword !== req.body.password && res.status(401).json("wrong password")

    const accessToken = jwt.sign(
        {
            id:user._id,
            isAdmin:user.isAdmin,
        },
        process.env.JWT_SEC
    )


//comment montrer tous lobjet utilisateur sans reveler le mdp
const { password,...others } = user._doc
//... pour ne pas etre coincer dans un accolade others {}
    res.status(200).json({...others, accessToken})
   }
   catch{
    res.status(500).json("not good")
   }
})

module.exports = router; 
