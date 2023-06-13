//-----On importe le fichier sauce/models-----
const Sauce = require('../models/Sauce');
//-----On importe fs pour accéder aux fichiers du serveur-----
const fs = require('fs');


exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(sauce => 
        res.status(200).json(sauce)
      )
      .catch(error =>
        res.status(404).json({error})
    );
  };


  exports.getAllSauce = (req, res, next) => {
    Sauce.find()
    .then(sauces => 
        res.status(200).json(sauces))
    .catch(error =>
        res.status(400).json({error})
    );
  };

//-----POST-----
exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
        ...sauceObject,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    });
//-----On enregistre-----
    sauce.save()
    .then(() => { res.status(201).json({message: 'Sauce enregistrée !'})})
    .catch(error => { res.status(400).json( { error })})
 };

 //-----PUT-----
 exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  
    delete sauceObject._userId;
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({ message : 'Non autorisé'});
            } else {
                Sauce.updateOne({ _id: req.params.id}, { ...sauceObject, _id: req.params.id})
                .then(() => res.status(200).json({message : 'Sauce modifiée!'}))
                .catch(error => res.status(401).json({ error }));
            }
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
 };

 //-----DELETE-----
 exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id})
        .then(sauce => {
            if (sauce.userId != req.auth.userId) {
                res.status(401).json({message: 'Non autorisé'});
            } else {
                const filename = sauce.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    Sauce.deleteOne({_id: req.params.id})
                        .then(() => { res.status(200).json({message: 'Sauce supprimée !'})})
                        .catch(error => res.status(401).json({ error }));
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        });
 };


exports.likeSauce = (req, res, next) => {
//-----Sélectiond e la sauce pour l'afficher les likes et dislikes-----
    Sauce.findOne({_id: req.params.id})
        .then(sauce => {
//-----On ajoute un like-----
            if(!sauce.usersLiked.includes(req.body.userId) && req.body.like === 1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : 1}, $push: { usersLiked : req.body.userId}, _id: req.params.id})
                .then(() => { res.status(200).json({message: 'Vous aimez la sauce!'})})
                .catch(error => {res.status(500).json({error});
            })
        }
//-----On ajoute un dislike-----
            if(!sauce.usersDisliked.includes(req.body.userId) && req.body.like === -1) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : 1}, $push: { usersDisliked : req.body.userId}, _id: req.params.id})
                .then(() => { res.status(200).json({message: `Vous n' aimez pas la sauce!`})})
                .catch(error => {res.status(500).json({error});
            })
        }
//-----Neutre like (pas de vote possible pour une sauce déjà liker)-----
            if(sauce.usersLiked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: {likes : -1}, $pull: { usersLiked : req.body.userId}, _id: req.params.id})
                .then(() => { res.status(200).json({message: 'Vous avez déjà voté!'})})
                .catch(error => {res.status(500).json({error});
            })
        }
//-----Neutre dislike (pas de vote possible pour une sauce déjà disliker)-----
            if(sauce.usersDisliked.includes(req.body.userId) && req.body.like === 0) {
                Sauce.updateOne({ _id: req.params.id }, { $inc: {dislikes : -1}, $pull: { usersDisliked : req.body.userId}, _id: req.params.id})
                .then(() => { res.status(200).json({message: 'Vous avez déjà voté!'})})
                .catch(error => {res.status(500).json({error});
            })
        }
    })
        .catch(error => {
            res.status(500).json({error});
        });
};