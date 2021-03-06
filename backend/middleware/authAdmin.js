const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        //const userId = decodedToken.userId;
        const userAdmin = decodedToken.userAdmin;
        if (userAdmin !== 1) {
            throw 'utilisateur non autorisé';
        } else {
            next();
        }
    } catch {
        res.status(401).json({
            error: "non autorisé"
        });
    }
};