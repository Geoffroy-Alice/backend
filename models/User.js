//-----On importe mongoose-----
const mongoose = require('mongoose');

//-----On importe la méthode pour l'e-mail unique-----
const uniqueValidator = require('mongoose-unique-validator');

//-----On enregistre un nouvel utilisateur avec un email unique(pour un utilisateur)-----
const userSchema = mongoose.Schema({
    email : {type: String, required: true, unique: true},
    password : {type: String, required: true},
});

//-----Méthode de vérification de l'e-mail unique-----
userSchema.plugin(uniqueValidator);

//-----On exporte userschema-----
module.exports = mongoose.model('User', userSchema);