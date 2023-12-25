const express = require("express");
const cors = require("cors");
const app = express();
//const helmet = require("helmet");
const path = require("path");
// Dans un fichier d'initialisation ou au démarrage de votre application

app.use(cors());

// Importez vos routes ici
const loginRoute = require("./api/user/login");
const signupRoute = require("./api/user/signup");
const updateUserRoute = require("./api/user/update");
const deleteUserRoute = require("./api/user/delete");
const getUserByIdRoute = require("./api/user/getUserById");
const getAllUsersRoute = require("./api/user/getAll");
const auth = require("./middleware/auth");

// Gestion des fichiers statiques (pour les images)
app.use("/images", express.static(path.join(__dirname, "images")));

// Sécurité des en-têtes HTTP
//app.use(helmet());

// Utilisez vos routes importées ici
app.use("/api/user/login", auth, loginRoute);
app.use("/api/user/signup", auth, signupRoute);
app.use("/api/user/update", auth, updateUserRoute);
app.use("/api/user/delete", auth, deleteUserRoute);
app.use("/api/user/getById/", auth, getUserByIdRoute);
app.use("/api/user/getAll", auth, getAllUsersRoute);

module.exports = app;
