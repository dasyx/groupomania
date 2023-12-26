const db = require("../../models");
const userController = require("../../controllers/users");

export default async function getUserById(req, res) {
  try {
    // À supprimer ou à modifier pour la production
    await db.sequelize.sync();

    // Définir les headers CORS
    res.setHeader("Access-Control-Allow-Origin", "*"); // Ajustez selon vos besoins de sécurité
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS"); // Méthodes autorisées
    res.setHeader("Access-Control-Allow-Headers", "Content-Type"); // Headers autorisés

    // Gérer les requêtes OPTIONS pour le pré-vérification CORS
    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    if (req.method === "GET") {
      return userController.getOneUser(req, res); // Transmettez l'ID à la fonction du contrôleur
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
