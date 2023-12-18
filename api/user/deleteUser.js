const db = require("../../models");
const userController = require("../../controllers/users");
const auth = require("../../middleware/auth");
const authAdmin = require("../../middleware/authAdmin");

module.exports = async (req, res) => {
  await db.sequelize.sync();
  if (req.method === "DELETE") {
    await auth(req, res);
    await authAdmin(req, res);
    return userController.deleteAccountAdmin(req, res);
  }
  res.status(405).send("Method Not Allowed");
};
