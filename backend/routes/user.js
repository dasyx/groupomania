const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const user = require('../controllers/users');

//router.get('/:id', auth, user);
router.post('/signup', user.signup);
router.post('/login', user.login);
router.get('/:id', auth, user.getOneUser);
router.delete('/delete', auth, user.deleteUser);

router.get('/', auth, authAdmin, user.getAllUsers);

module.exports = router;