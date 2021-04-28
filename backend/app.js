const express = require('express');
// Importation du package helmet pour sécuriser la requête http
const helmet = require('helmet');
// Importation du package mongoose pour accèder à la base de données
const mongoose = require('mongoose');
// Importation qui donne accès au système de fichiers
const path = require('path');
// Importation du package gérant la connexion par cookie
const cookieSession = require('cookie-session');

// Utilisation de variable d'environnement pour dissimuler les infos de connexion
require('dotenv').config();

// Connection au cluster MongoDB incluant la variable d'environnement du fichier .env
mongoose.connect(process.env.DB_CONNECT,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Grâce à ces headers, on pourra accèder notre API depuis n'importe quelle origine, et envoyer différents types de requêtes
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use((req, res, next) => {
  console.log('Requête reçue !');
  next();
});

app.use((req, res, next) => {
  res.status(201);
  next();
});

app.use((req, res, next) => {
  res.json({ message: 'Votre requête a bien été reçue !' });
  next();
});

app.use((req, res, next) => {
  console.log('Réponse envoyée avec succès !');
});

// Sécurisation de la session et paramètrage du cookie de la session
app.use(cookieSession({
  name: 'session',
  secret: process.env.COOKIE_SESS,
  cookie: {
    secure: true,
    httpOnly: true,
    domain: "http://localhost:3000/",
    maxAge: 60 * 60 * 1000 // 1 heure de validité
  }
}))

app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Afin de prévenir les attaques DDOS,
// On limitera le payload qu'un utilisateur pourra soumettre à l'API
app.use(express.json({ limit: '5kb' }));

// Ce middleware répondra aux requêtes envoyées à /images
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

module.exports = app;