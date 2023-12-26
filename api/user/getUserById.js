//const db = require("../../models");
const userController = require("../../controllers/users");

export default async function getUserById(req, res) {
  try {
    // À supprimer ou à modifier pour la production
    //await db.sequelize.sync();

    if (req.method === "GET") {
      const userId = req.params.id; // Assurez-vous d'extraire l'ID de l'utilisateur
      const username = req.params.username;
      if (!userId) {
        return res.status(400).send("User ID is required");
      }
      return userController.getOneUser(userId, username, req, res); // Transmettez l'ID à la fonction du contrôleur
    } else {
      // Réponse pour les méthodes HTTP non gérées
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    // Log des détails de l'erreur pour le débogage
    console.error("Error in getUserById route:", error);
    res.status(500).send("Internal Server Error");
  }
}
