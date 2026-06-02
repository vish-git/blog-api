const express = require('express');
const CommentController = require('../controllers/CommentController');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();
router.get('/:postId', CommentController.getComments);
router.post('/:postId', authMiddleware, CommentController.addComment);

module.exports = router;
