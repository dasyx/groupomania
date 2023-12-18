const express = require("express");
const cors = require("cors");
//const helmet = require("helmet");
const path = require("path");

const app = express();

// Configuration CORS
app.use(cors());

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Autres configurations globales si nécessaire

module.exports = app;
