const express = require("express");
const app = express();
const cors = require("cors");
//const helmet = require("helmet");
const path = require("path");
// Dans un fichier d'initialisation ou au démarrage de votre application

// Importez vos routes ici
const loginRoute = require("./api/user/login");
const signupRoute = require("./api/user/signup");
const updateUserRoute = require("./api/user/update");
const deleteUserRoute = require("./api/user/delete");
const getUserByIdRoute = require("./api/user/getUserById");
const getAllUsersRoute = require("./api/user/getAll");

app.use(cors());

// Middleware pour le parsing des données JSON
app.use(express.json());

// Middleware pour le logging des requêtes
app.use((req, res, next) => {
  console.log(`${new Date().toLocaleString()}: ${req.method} ${req.path}`);
  next();
});

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Utilisez vos routes importées ici
app.use("/api/user/login", loginRoute);
app.use("/api/user/signup", signupRoute);
app.use("/api/user/update", updateUserRoute);
app.use("/api/user/delete", deleteUserRoute);
app.use("/api/user/getById/:id", getUserByIdRoute);
app.use("/api/user/getAll", getAllUsersRoute);

module.exports = app;
