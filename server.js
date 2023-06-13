//-----Constante pour les requêtes http-----
const http = require('http');
//-----Importation de app.js-----
const app = require('./app');

//-----Fonction qui renvoie un port valide, qu'il soit fourni soit sous la forme d'un numéro ou d'une chaîne-----
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
//-----Port sur lequel va tourner l'application-----
app.set('port', port);

//-----Recherche des différentes erreurs et les gère de manière appropriée-----
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

//-----On crée le server et on lui passe l'application-----
const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

//-----On écoute les requêtes sur le port-----
server.listen(port);
