const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const post = require('../controllers/posts');

router.post('/newpost', auth, multer, post.newPost);

module.exports = router;