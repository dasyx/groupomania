const db = require("../../models");
const user = require("../../controllers/users");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  if (process.env.NODE_ENV === "development") {
    await db.sequelize.sync();
  }

  if (req.method === "GET") {
    await auth(req, res);
    return user.getOneUser(req, res);
  }

  res.status(405).send("Method Not Allowed");
};
