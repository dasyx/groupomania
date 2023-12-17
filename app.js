const express = require("express");
//const helmet = require("helmet");
const path = require("path");
const helmet = require("helmet");

require("dotenv").config();

// Application Express :
const app = express();

// Utilisation du package CORS pour une gestion simplifiée des CORS
// En environnement de production, spécifiez les origines autorisées pour plus de sécurité
const cors = require("cors");

// Configure CORS

/* const corsOptions = {
  origin: function (origin, callback) {
    // Autorise les domaines Vercel avec un pattern spécifique et localhost
    if (
      /^https:\/\/groupomania-[a-zA-Z0-9]+-dasyx\.vercel\.app$/.test(origin) ||
      origin.startsWith("http://localhost:3000")
    ) {
      callback(null, true); // Autoriser
    } else {
      callback(new Error("Not allowed by CORS")); // Rejeter
    }
  },
  optionsSuccessStatus: 200, // Pour la compatibilité avec les anciens navigateurs
};

app.use(cors(corsOptions)); */

const corsOptions = {
  origin: function (origin, callback) {
    // Autorise toutes les requêtes provenant de http://localhost:3000/images/*
    if (origin && origin.startsWith("http://localhost:3000/images/")) {
      callback(null, true); // Autoriser
    } else {
      callback(new Error("Not allowed by CORS")); // Rejeter
    }
  },
  optionsSuccessStatus: 200, // Pour la compatibilité avec les anciens navigateurs
};

app.use(cors(corsOptions));

// MODIFIER SI UTILISATION EN LOCAL
/* app.use(
  cors({
    origin: "http://localhost:8080",
  })
); */
// Utilisation d'Helmet pour sécuriser les en-têtes HTTP
// Attention : quand je l'utilise, mes images ne s'affichent plus dans le frontend
//app.use(helmet());

// Sécurisation des en-têtes HTTP
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' *.vercel.app http://localhost:3000; "
  );
  next();
});

// Utilisation du package Express pour traiter les données JSON et les données de formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Optionnel : Limiter la taille des requêtes pour prévenir les attaques DDOS
// app.use(express.json({ limit: '5kb' }));

const db = require("./models");

// Synchronisation avec la base de données
// En production, envisagez une stratégie de migration plutôt que de synchronisation directe
db.sequelize.sync();

// Middleware pour servir les fichiers statiques dans le dossier 'images'
app.use("/images", express.static(path.join(__dirname, "images")));

// Enregistrement des routes
app.use("/api/user", require("./routes/user"));
app.use("/api/post", require("./routes/post"));
app.use("/api/comment", require("./routes/comment"));

module.exports = app;
