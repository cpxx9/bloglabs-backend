const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const createPost = async (req, res, next) => {};
const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      select: {
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
