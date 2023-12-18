const db = require("../../models");
const postController = require("../../controllers/posts");
const auth = require("../../middleware/auth");

module.exports = async (req, res) => {
  await db.sequelize.sync();
  if (req.method === "GET") {
    await auth(req, res);
    return postController.getPost(req, res);
  }
  res.status(405).send("Method Not Allowed");
};
