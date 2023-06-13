//-----On importe express-----
const express = require('express');
//-----On appelle express-----
const router = express.Router();
//-----On importe middleware/auth-----
const auth = require('../middleware/auth');
//-----On importe middleware/multer-----
const multer = require('../middleware/multer');
//-----On importe le fichier sauce/controllers-----
const sauceCtrl = require('../controllers/sauce');


//-----Route GET-----
router.get('/', auth, sauceCtrl.getAllSauce);

//-----Route GET-----
router.get('/:id', auth, sauceCtrl.getOneSauce);

//-----Route POST-----
router.post('/', auth, multer, sauceCtrl.createSauce);

//-----Route PUT-----
router.put('/:id', auth, multer, sauceCtrl.modifySauce);

//-----Route DELETE-----
router.delete('/:id', auth, sauceCtrl.deleteSauce);

//-----Route POST-----
router.post('/:id/like', auth, sauceCtrl.likeSauce);


//-----On exporte le fichier-----
module.exports = router;