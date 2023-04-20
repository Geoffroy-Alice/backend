//-----On importe mongoose-----
const mongoose = require('mongoose');

//-----On enregistre un nouvel utilisateur avec un email unique(pour un utilisateur)-----
const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
});

//-----On exporte userschema-----
module.exports = mongoose.model('User', userSchema);