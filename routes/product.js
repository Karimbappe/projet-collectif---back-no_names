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
 router.get('/filter', async (req, res, next) => {
    // req query retourn ce qu'on lui demande (?category=Chaise, (plus si tu veux :))
    const filters = req.query;
    console.log(filters)
    // listProducts va chercher le model de Product et fait marcher la fonction find () de  node pour retourner tous les products
    const listProducts = await Product.find()
    //La const filteredProducts va prendre le tableau des produits et va utiliser la fonction filtrer pour filtrer selon le filters

    //product est un élément du tableau des Produits et passe un à un (comme les index) et passe chaque produit par des condition
    const filteredProducts = listProducts.filter(product => {
        // isValid est définie comme vraie pour initier le filtrage
      let isValid = true;

      //les cléfs dans le var filters sert à parcourir les clefs
      for (key in filters) {
        // console.log(key, product[key], filters[key]);
        isValid = isValid && product[key] == filters[key];
      }
      return isValid;
    });
    res.send(filteredProducts);

  });
  


module.exports = router; 