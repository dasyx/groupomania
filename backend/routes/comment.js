const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
const comment = require('../controllers/comments');

router.post('/new', auth, comment.newComment);

router.get('/user/:id', auth, authAdmin, comment.getUserComments); 

module.exports = router;