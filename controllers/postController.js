const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { validatePost } = require('../utils/validations');

const prisma = new PrismaClient();

const createPost = [
  validatePost,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const newPost = await prisma.post.create({
        data: {
          title: req.body.title,
          subtitle: req.body.subtitle,
          authorId: req.user.id,
          content: req.body.content,
        },
      });
      res.status(200).json({ success: true, data: newPost });
    } catch (err) {
      next(err);
    }
  },
];
const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        created: true,
        updated: true,
        title: true,
        subtitle: true,
        authorId: true,
        author: true,
      },
    });
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    next(err);
  }
};
const getPost = async (req, res, next) => {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: req.params.postId,
      },
      select: {
        created: true,
        updated: true,
        title: true,
        subtitle: true,
        authorId: true,
        author: true,
        content: true,
        comments: true,
      },
    });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    next(err);
  }
};
const updatePost = async (req, res, next) => {};
const deletePost = async (req, res, next) => {};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
