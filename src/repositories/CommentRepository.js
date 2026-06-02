// src/repositories/CommentRepository.js
const Comment = require('../models/Comment');

const CommentRepository = {
  async create(commentData) {
    return await Comment.create(commentData);
  },

  async findByPost(postId, { limit = 50, skip = 0 } = {}) {
    return await Comment.find({ postId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('userId', 'username');
  },

  async countByPost(postId) {
    return await Comment.countDocuments({ postId });
  }
};

module.exports = CommentRepository;
