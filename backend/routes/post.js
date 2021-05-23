const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const post = require('../controllers/posts');


router.post('/new', auth, post.newPost);

module.exports = router;