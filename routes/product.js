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
router.get("/product", async(req, res) => {
    console.log("cela tourne")
    const returnList = await Product.find()
    res.json(returnList)
    
})

 //filtrer
 router.get('/filter', (req, res, next) => {
    const filters = req.query;
    console.log("cela rentre")
    const filteredUsers = productRoute.filter(user => {
      let isValid = true;
      for (key in filters) {
        console.log(key, user[key], filters[key]);
        isValid = isValid && user[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredUsers);
  });
  


module.exports = router; 