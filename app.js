//-----On importe express-----
const express = require('express');
//-----On importe la connexion a mongoDB-----
const mongoose = require('mongoose');
//-----On importe path-----
const path = require('path');
//-----Appel de express-----
const app = express();
//-----On importe routes/sauce-----
const sauceRoutes = require('./routes/sauce');
//-----On importe routes/user-----
const userRoutes = require('./routes/user');

//-----CORS-----
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  //-----Connexion a mongoDB-----
  mongoose.connect('mongodb+srv://geoffroyalice:salobeudidesreux@cluster0.lwj954g.mongodb.net/',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

//-----On utilise express.json pour récupérer et afficher en format json-----
app.use(express.json());


//-----Routes-----
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;