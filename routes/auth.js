
const router = require("express").Router();

//need to get the model to be able to Post
const User = require("../models/User")

//To be able to hash
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken")



//REGISTER
router.post("/register", async (req, res) => { 
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        birthday: req.body.birthday,
        // recommend: req.body.recommend,

        //cryptojs pour hasher mdp ciphers
        password: CryptoJS.AES.encrypt(req.body.password, "secret").toString()
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

    const user = await User.findOne({username: req.body.username})
    !user && res.status(401).json("wrong username")
    
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


//how to not show password 
const { password,...others } = user._doc
//... to not be stuck in others {}
    res.status(200).json({...others, accessToken})
   }
   catch{
    res.status(500).json(err)
   }
})

module.exports = router; 