//-----On importe express-----
const express = require('express');
//-----On appelle express-----
const router = express.Router();
//-----On importe user/controllers-----
const userCtrl = require('../controllers/user.js');



//-----Router POST pour ajouter un utilisateur-----
router.post('/signup', userCtrl.signup);

//-----Router POST pour la connexion-----
router.post('/login', userCtrl.login);


//-----On exporte-----
module.exports = router;
