//-----On importe jsonwebtoken-----
const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
//-----On récupère le token-----
       const token = req.headers.authorization.split(' ')[1];
//-----On décode le token-----
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
//----On récupère le userId-----
       const userId = decodedToken.userId;
       req.auth = {
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};