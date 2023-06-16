//-----On importe le fichier user/model-----
const User = require('../models/User');
//-----on importe bcrypt pour le hashage du mot de passe-----
const bcrypt = require('bcrypt');
//-----On importe jsonwebtoken-----
const jwt = require('jsonwebtoken');


//-----On inscrit un nouvel utilisateur-----
exports.signup = (req, res, next) => {
const validatePassword = /(?=.*[a-zA-Z])(?=.*[0-9]+)(?=.*?[#?!@$%^&*-]).*/g.test(req.body.password);
  if(!validatePassword) {
    res.status(400).send('Le mot de passe est invalide. Il doit contenir minuscule, majuscule, chiffre et caractère spécial.')
  }
  if(req.body.password.length < 12) {
    res.status(400).send('Le mot de passe doit contenir au minimum 12 caractères')
  }
//-----On hashe le mot de passe-----
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
//-----On enregistre dans la base de donnée-----
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};
//-----Connexion d'un utilisateur-----
exports.login = (req, res, next) => {

//-----On vérifie si l'e-mail est dans la base de données-----
    User.findOne({ email: req.body.email })
    .then(user => {
        if (!user) {
            return res.status(401).json({ message: 'Utilisateur non trouvé!'});
        }
//-----On compare le mot de passe que l'utilisateur à inscrit avec le hash-----
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Mot de passe incorrect!' });
                }
                else{
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
//-----Le token a une validité de 24h-----
                        { expiresIn: '24h' }
                    )
                });
            }
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};