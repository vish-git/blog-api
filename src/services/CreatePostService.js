const CreatePostService = (postRepository) => ({
  async execute({ title, content = '', tags = [], authorId }) {
    if (!title || !authorId) {
      const err = new Error('title and authorId are required');
      err.status = 400;
      throw err;
    }
    return await postRepository.create({ title, content, tags, authorId });
  }
});

module.exports = CreatePostService;
