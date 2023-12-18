const express = require("express");
const cors = require("cors");
//const helmet = require("helmet");
const path = require("path");
// Dans un fichier d'initialisation ou au démarrage de votre application
const db = require("./models");

db.sequelize.sync().then(() => {
  console.log("Les modèles sont synchronisés avec la base de données");
});

const app = express();

app.use(cors());

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
