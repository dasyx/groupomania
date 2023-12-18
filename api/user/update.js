const db = require("../../models");
const userController = require("../../controllers/users");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await db.sequelize.sync();
  }

  if (req.method === "PUT") {
    await auth(req, res);
    return userController.updateUser(req, res);
  }

  res.status(405).send("Method Not Allowed");
};
