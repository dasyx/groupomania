const db = require("../../models");
const userController = require("../../controllers/users");

export default async function login(req, res) {
  try {
    // Synchronisation à revoir pour la production
    await db.sequelize.sync();

    if (req.method === "POST") {
      return userController.login(req, res);
    }

    // Réponse pour les méthodes HTTP non gérées
    res.status(405).send("Method Not Allowed");
  } catch (error) {
    console.error("Error in login route:", error);
    res.status(500).send("Internal Server Error");
  }
}
