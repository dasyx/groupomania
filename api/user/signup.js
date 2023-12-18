const db = require('../../models');
const userController = require('../../controllers/users');

module.exports = (req, res) => {
    await db.sequelize.sync();
    if (req.method === 'POST') {
        return userController.signup(req, res);
    }
    res.status(405).send('Method Not Allowed');
};

