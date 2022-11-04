const router = require("express").Router();
const { Router } = require("express");
const Product = require("../models/Product")


//Produits POST
router.post("/product", async (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
        category:req.body.category,
        size: req.body.size,
        color: req.body.color,
        price: req.body.price,
        inStock : req.body.inStock,
        ratings : req.body.ratings,
        reviews: req.body.reviews,

    })
    try {
        //save to database
        const savedProduct = await newProduct.save()
       res.status(201).json(savedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
})

//Produits GET
// router.get("/product", async(req, res) => {
//     console.log("cela tourne")
//     const returnList = await Product.find()
//     res.json(returnList)
    
// })


router.get("/product/chaise", async(req, res) => {
    const category = await Product.findAll({"category":req.params.category});
    res.json(category);
})


module.exports = router; 