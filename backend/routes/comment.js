const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authRole = require('../middleware/authRole');
const comment = require('../controllers/comments');

router.post('/new', auth, comment.newComment);

router.get('/user/:id', auth, authRole, comment.getUserComments); 

module.exports = router;