const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const user = require('../controllers/users');

//router.get('/:id', auth, user);
router.get('/:id', auth, user.getOneUser);
router.post('/signup', user.signup);
router.post('/login', user.login);
router.delete('/delete', auth, user.deleteUser);

module.exports = router;