const db = require("../../models");
const userController = require("../../controllers/users");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  // Set CORS headers
  /* res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "PUT, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization"); */

  await db.sequelize.sync();

  if (req.method === "PUT") {
    await auth(req, res);
    return userController.updateUser(req, res);
  } else if (req.method === "OPTIONS") {
    // Handle preflight request for CORS
    res.status(200).end();
    return;
  }

  res.status(405).send("Method Not Allowed");
};
