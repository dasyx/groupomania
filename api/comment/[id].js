const db = require("../../models");
const commentController = require("../../controllers/comments");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  await db.sequelize.sync();
  if (req.method === "GET") {
    await auth(req, res);
    return commentController.getComment(req, res);
  }
  res.status(405).send("Method Not Allowed");
};
