const express = require('express');
const router = express.Router();
//const multer = require('../middleware/multer-config');

const auth = require('../middleware/auth');
const post = require('../controllers/posts');

router.get('/', auth, post.getAllPosts);
router.post('/newpost', auth, post.newPost);

module.exports = router;