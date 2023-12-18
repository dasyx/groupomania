const db = require('../../models');
const commentController = require('../../controllers/comments');
const auth = require('../../middleware/auth');

module.exports = (req, res) => {
    await db.sequelize.sync();
    if (req.method === 'PUT') {
        await auth(req, res);
        return commentController.updateComment(req, res);
    }
    res.status(405).send('Method Not Allowed');
};


