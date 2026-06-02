// src/repositories/PostRepository.js
const Post = require('../models/Post');

const PostRepository = {
  async create(postData) {
    return await Post.create(postData);
  },

   async findAll({ limit = 50, skip = 0 } = {}) {
    return await Post.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('authorId', 'username');
  },

//   async findAll() {
//     return await Post.find().populate('authorId', 'username');
//   },

  async findById(id) {
    return await Post.findById(id).populate('authorId', 'username');
  },

  async updateById(id, update) {
    return await Post.findByIdAndUpdate(id, update, { new: true });
  },

  async deleteById(id) {
    return await Post.findByIdAndDelete(id);
  }
};

module.exports = PostRepository;
