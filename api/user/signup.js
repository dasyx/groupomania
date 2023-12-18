const db = require("../../models");
const userController = require("../../controllers/users");

export default async function signup(req, res) {
  try {
    if (process.env.NODE_ENV === "development") {
      await db.sequelize.sync();
    }

    if (req.method === "POST") {
      return userController.signup(req, res);
    }

    // Réponse pour les méthodes HTTP non gérées
    res.status(405).send("Method Not Allowed");
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).send("Internal Server Error");
  }
}
