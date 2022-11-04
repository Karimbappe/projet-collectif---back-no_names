const router = require("express").Router();
const { Router } = require("express");
const Product = require("../models/Product")


//Produits
router.post("/producte", async (req, res) => {
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

module.exports = router; 