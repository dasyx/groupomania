const express = require('express');
// Importation du package helmet pour sécuriser la requête http
const helmet = require('helmet');
// Importation qui donne accès au système de fichiers
const path = require('path');

//ID pour connexion à la DB :
const connectdb = require('./config/database');

// Application Express :
const app = express();

// Importation du routeur contenant les middlewares d'authentification
const userRoutes = require('./routes/user');

//connexion DB :
app.connect(connectdb);

// Grâce à ces headers, on pourra accèder notre API depuis n'importe quelle origine, et envoyer différents types de requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Afin de prévenir les attaques DDOS,
// On limitera le payload qu'un utilisateur pourra soumettre à l'API
app.use(express.json({ limit: '5kb' }));

// Ce middleware répondra aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

//enregistre routers
app.use('/user', userRoutes);

module.exports = app;