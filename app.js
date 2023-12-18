const express = require("express");
const cors = require("cors");
//const helmet = require("helmet");
const path = require("path");

const app = express();

// Configuration CORS
app.use(cors());

const whitelistRegex =
  /^https:\/\/groupomania-[a-zA-Z0-9]+-dasyx\.vercel\.app$/;

const corsOptions = {
  origin: function (origin, callback) {
    // Vérifier si l'origine est dans la whitelist ou est localhost
    if (!origin || whitelistRegex.test(origin)) {
      callback(null, true); // Autoriser
    } else {
      callback(new Error("Not allowed by CORS")); // Rejeter
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Autres configurations globales si nécessaire

module.exports = app;
