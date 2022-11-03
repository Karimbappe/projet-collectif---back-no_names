//création et lecture de http par node(protocole/pont) qu'on stock dans const http
//pour appeller le fichier app.js on le stock dans un const app
// const app = require('./app');
// //pour afficher ce qu'il y a dans app.js on utilise la méthode set
// app.set('port', process.env.PORT || 8000);
// //création de server stockage dans un const server
// const server = http.createServer(app);
// //affichage sur le port 8000 de l'equivalent du print en utilisant méthode listen
// server.listen(process.env.PORT || 8000);

const productRoute = require("./routes/products");
//Connexion database Mongodb
const express = require("express")
const mongoose = require("mongoose")
const app=express()
const zoe=0

//pou passer des données en json
app.use(express.json())
//connect to DB
mongoose
  .connect(
    "mongodb+srv://mariellek:Ilovemycat66@cluster0.haiercr.mongodb.net/test"
  )
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));
