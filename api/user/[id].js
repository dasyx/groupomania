const db = require("../../models");
const user = require("../../controllers/users");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  try {
    // Synchronisation à revoir pour la production
    await db.sequelize.sync();

    if (req.method === "GET") {
      // Utilisez le middleware d'authentification ici
      auth(req, res, async () => {
        // Si l'utilisateur est authentifié, appelez la fonction getAll
        return user.getAll(req, res);
      });
    } else {
      // Réponse pour les méthodes HTTP non gérées
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    console.error("Error in getAll route:", error);
    res.status(500).send("Internal Server Error");
  }
};
