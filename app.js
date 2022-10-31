//app.js est l'interface ( ce qu'on voit ) il sera lié au server.js
//app.js est un constructeur avec des propriétés qu'on developpera dans les autres classes

// la methode require importe la totalité du module
const express = require('express');
const app = express();
const mysql = require('mysql');

//connection au base de données
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'meuble'
  });
  connection.connect((err) => {
    if (err) throw err;
    console.log('Connected!');
  });