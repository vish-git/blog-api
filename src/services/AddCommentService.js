const AddCommentService = (commentRepository, postRepository) => ({
  async execute({ postId, userId, comment }) {
    if (!postId || !userId || !comment) {
      const err = new Error('postId, userId and comment are required');
      err.status = 400;
      throw err;
    }

    const post = await postRepository.findById(postId);
    if (!post) {
      const err = new Error('Post not found');
      err.status = 404;
      throw err;
    }

    return await commentRepository.create({ postId, userId, comment });
  }
});

module.exports = AddCommentService;
