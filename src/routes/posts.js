const express = require('express');
const PostController = require('../controllers/PostController');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.get('/', PostController.getPosts);
router.post('/', authMiddleware, PostController.createPost);

module.exports = router;
