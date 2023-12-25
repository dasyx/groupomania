const db = require("../../models");
const userController = require("../../controllers/users");

export default async function signup(req, res) {
  try {
    console.log("Syncing database...");
    await db.sequelize.sync();

    if (req.method === "POST") {
      console.log("Attempting to sign up user with data:", req.body);
      return userController.signup(req, res);
    }

    console.log("Received non-POST request");
    res.status(405).send("Method Not Allowed");
  } catch (error) {
    console.error("Error in signup route:", error);
    res.status(500).send("Internal Server Error: " + error.message);
  }
}
