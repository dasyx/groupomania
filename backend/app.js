const express = require('express');
// Importation du package helmet pour sécuriser la requête http
const helmet = require('helmet');
// Importation qui donne accès au système de fichiers
const path = require('path');

require('dotenv').config()

// Application Express :
const app = express();

// Grâce à ces headers, on pourra accèder notre API depuis n'importe quelle origine, et envoyer différents types de requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// Utilisation du package Express qui permet de gérer des données
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Afin de prévenir les attaques DDOS,
// On limitera le payload qu'un utilisateur pourra soumettre à l'API
//app.use(express.json({ limit: '5kb' }));

const db = require("./models");

db.sequelize.sync();
 // drop the table if it already exists
/*  db.sequelize.sync({ force: true }).then(() => {
   console.log("Drop and re-sync db.");
});
 */

// Ce middleware répondra aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

//enregistre routers
app.use('/api/user', require('./routes/user'));
app.use('/api/post', require('./routes/post'));
app.use('/api/comment', require('./routes/comment'));

module.exports = app;