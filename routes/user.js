const router = require("express").Router();
const { findById, findByIdAndUpdate } = require("../models/User");
const { verifyToken, verifyTokenAndAuthorization } = require("./verifyToken")


//UPDATE (CRUD)
router.put("/:id", verifyTokenAndAuthorization, (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, "secret").toString()


    }
    try{
        const updateUser = findByIdAndUpdate(req.params.id,{
            //write whats going to be updated
            // set the req and body again have to write new and true to be updated
            $set: req.body
        },{new:true}
        );
        res.status(200).json(updateUser);
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router; 