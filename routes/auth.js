
const router = require("express").Router();

//doit avoir le model pour pouvoir le poster 
const User = require("../models/User")

//pour hasher
const CryptoJS = require("crypto-js");
//pour les tokens
const jwt = require("jsonwebtoken")



//REGISTER
router.post("/register", async (req, res) => { 
    //comment on creer un utilisateur qui suit le model importer en haut 
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        birthday: req.body.birthday,
        // recommend: req.body.recommend,

        //cryptojs pour hasher mdp ciphers
        password: CryptoJS.AES.encrypt(req.body.password, "secret").toString()
    })

    try {
        //sauvegarde à la base de données
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


//comment montrer tous lobjet utilisateur sans reveler le mdp
const { password,...others } = user._doc
//... pour ne pas etre coincer dans un accolade others {}
    res.status(200).json({...others, accessToken})
   }
   catch{
    res.status(500).json(err)
   }
})

module.exports = router; 