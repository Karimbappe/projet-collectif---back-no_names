const router = require("express").Router();
const { Router } = require("express");
const Product = require("../models/Product")
router.get("/get-products", async (req, res)=>{
    res.send('Its working!')
})
module.exports = router; 