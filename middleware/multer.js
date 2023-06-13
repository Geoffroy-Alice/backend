//-----On importe multer-----
const multer = require('multer');

//-----Le dictionnaire de MIME_TYPES-----
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

//-----Configuration pour multer-----
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

//-----On exporte le middleware multer-----
module.exports = multer({storage: storage}).single('image');