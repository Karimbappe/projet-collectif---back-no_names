
const router = require("express").Router();

//need to get the model to be able to Post
const User = require("../models/User")
const birthday = require("../models/User")

//To be able to hash
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")



//REGISTER
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        birthday: req.body.birthday,

        //cryptojs pour hasher mdp ciphers
        password: CryptoJS.AES.encrypt(req.body.password, PASS_SEC).toString()
    })

    try {
        //save to database
        const savedUser = await newUser.save()
       res.status(201).json(savedUser)
       console.log("utilisateur enregistrer")
    } catch (err) {
        res.status(500).json(err)
    }


})

//Login

router.post("/login", async (req, res) => {
   try{

    //UserName
    //findone returns one thing
    const user = await User.findOne({username: req.body.username});
    !user && res.status(401).json("wrong credentials")

    //Password
    //dehash password
    const hashedPassword = CryptoJS.AES.decrypt(user.password, PASS_SEC);

    
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8) 
    Originalpassword !== req.body.password && res.status(401).json("wrong credentials");

    //install jwt
    const accessToken = jwt.sign({
        id:user._id, 
        isAdmin:user._isAdmin
    },JWT_SEC)
 
    //mongo db stores in _doc our things
    const {password,... others }= user._doc;
    res.status(200).json({...others,accessToken}) 

   }
   catch(err)
 {
    res.status(500).json(err)
   }
})

module.exports = router; 