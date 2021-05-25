const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');
const post = require('../controllers/posts');

router.get('/', auth, post.getAllPosts);
router.get('/:id', auth, post.getOnePost);
router.post('/newpost', auth, multer, post.newPost);

module.exports = router;