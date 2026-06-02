const CommentRepository = require('../repositories/CommentRepository');
const PostRepository = require('../repositories/PostRepository');
const AddCommentService = require('../services/AddCommentService')(CommentRepository, PostRepository);

exports.addComment = async (req, res, next) => {
  try {
    const newComment = await AddCommentService.execute({
      postId: req.params.postId,
      userId: req.user.id,
      comment: req.body.comment
    });

    // Emit real-time event to clients in the post room
    req.io.to(req.params.postId).emit('newComment', newComment);

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};

exports.getComments = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const skip = parseInt(req.query.skip) || 0;
    const comments = await CommentRepository.findByPost(req.params.postId, { limit, skip });
    res.json(comments);
  } catch (err) {
    next(err);
  }
};
