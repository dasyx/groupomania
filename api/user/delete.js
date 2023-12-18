const db = require("../../models");
const userController = require("../../controllers/users");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  await db.sequelize.sync();
  if (req.method === "DELETE") {
    await auth(req, res);
    return userController.deleteUser(req, res);
  }
  res.status(405).send("Method Not Allowed");
};
