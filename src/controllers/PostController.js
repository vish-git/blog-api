const PostRepository = require('../repositories/PostRepository');
const CreatePostService = require('../services/CreatePostService')(PostRepository);

exports.createPost = async (req, res, next) => {
  try {
    const post = await CreatePostService.execute({
      title: req.body.title,
      content: req.body.content,
      tags: req.body.tags || [],
      authorId: req.user.id
    });
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

exports.getPosts = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 50;
    const skip = parseInt(req.query.skip) || 0;
    const posts = await PostRepository.findAll({ limit, skip });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await PostRepository.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};
