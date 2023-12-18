const db = require("../../models");
const userController = require("../../controllers/users");

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await db.sequelize.sync();
  }

  if (req.method === "POST") {
    return userController.signup(req, res);
  }

  res.status(405).send("Method Not Allowed");
};
