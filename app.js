const express = require("express");
const cors = require("cors");
const app = express();
//const helmet = require("helmet");
const path = require("path");
// Dans un fichier d'initialisation ou au démarrage de votre application

app.use(cors());

// Utilisation du package Express pour traiter les données JSON et les données de formulaire
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Importez vos routes ici
const loginRoute = require("./api/user/login");
const signupRoute = require("./api/user/signup");
const updateUserRoute = require("./api/user/update");
const deleteUserRoute = require("./api/user/delete");
const getUserByIdRoute = require("./api/user/getUserById");
//const getAllUsersRoute = require("./api/user/getAll");
const auth = require("./middleware/auth");

// Utilisez vos routes importées ici
app.use("/api/user/login", auth, loginRoute);
app.use("/api/user/signup", auth, signupRoute);
app.use("/api/user/update", auth, updateUserRoute);
app.use("/api/user/delete", auth, deleteUserRoute);
//app.use("/api/user/getAll", auth, getAllUsersRoute);
app.use("/api/user/:id", auth, getUserByIdRoute);

module.exports = app;
