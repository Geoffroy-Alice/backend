//-----On importe express-----
const express = require('express');

//-----On importe la connexion a mongoDB-----
const mongoose = require('mongoose');

//-----Appel de express-----
const app = express();


//-----On utilise express.json pour récupérer et afficher en format json-----
app.use(express.json());

//-----CORS-----
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use ((req, res, next) => {
    console.log('Requête reçue!');
    next();
});

app.use((req, res, next) => {
    res.status(201);
    next();
});

app.use((req, res, next) => {
    res.json({message: 'Votre requête a bien été reçue!'});
    next();
});

app.use((req, res) => {
    console.log('Réponse envoyée avec succès!');
});

module.exports = app;