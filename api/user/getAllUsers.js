const db = require("../../models");
const userController = require("../../controllers/users");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await db.sequelize.sync();
  }

  if (req.method === "GET") {
    await auth(req, res);
    await authAdmin(req, res);
    return userController.getAllUsers(req, res);
  }

  res.status(405).send("Method Not Allowed");
};
