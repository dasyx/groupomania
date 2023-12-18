import db from "../../models"; // Assurez-vous d'importer correctement le module Sequelize (db) depuis vos modèles
import userController from "../../controllers/users";
import authMiddleware from "../../middleware/auth";

export default async function getUserById(req, res) {
  try {
    // Synchronisation à revoir pour la production
    await db.sequelize.sync();

    if (req.method === "GET") {
      const userId = req.params.id;

      // Utilisez le middleware d'authentification ici
      authMiddleware(req, res, async () => {
        const user = await userController.getUserById(userId, req); // Utilisez le contrôleur pour obtenir l'utilisateur par son ID

        if (!user) {
          return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Vous pouvez retourner l'utilisateur trouvé ici
        res.status(200).json(user);
      });
    } else {
      // Réponse pour les méthodes HTTP non gérées
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    console.error("Error in getUserById route:", error);
    res.status(500).send("Internal Server Error");
  }
}
