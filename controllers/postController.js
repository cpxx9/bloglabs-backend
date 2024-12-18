const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { json } = require('stream/consumers');
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
        author: {
          include: {
            hash: false,
            salt: false,
          },
        },
        comments: true,
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
const updatePost = async (req, res, next) => {
  const data = { ...req.body };

  try {
    const updatedPost = await prisma.post.update({
      where: {
        id: req.params.postId,
      },
      data,
    });
    res.status(200).json({ success: true, data: updatedPost });
  } catch (err) {
    next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const deletedPost = await prisma.post.delete({
      where: {
        id: req.params.postId,
      },
    });
    res.status(200).json({ success: true, data: deletedPost });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost,
};
