const db = require('../../models');
const postController = require('../../controllers/posts');
const auth = require('../../middleware/auth');

module.exports = (req, res) => {
    await db.sequelize.sync();
    if (req.method === 'DELETE') {
        await auth(req, res);
        return postController.deletePost(req, res);
    }
    res.status(405).send('Method Not Allowed');
};


