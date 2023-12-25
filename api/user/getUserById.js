const db = require("../../models");
const userController = require("../../controllers/users");

export default async function getUserById(req, res) {
  try {
    // Synchronisation à revoir pour la production
    await db.sequelize.sync();

    if (req.method === "GET") {
      //const userId = req.params.id;
      return userController.getOneUser(req, res);
    } else {
      // Réponse pour les méthodes HTTP non gérées
      res.status(405).send("Method Not Allowed");
    }
  } catch (error) {
    console.error("Error in getUserById route:", error);
    res.status(500).send("Internal Server Error");
  }
}
