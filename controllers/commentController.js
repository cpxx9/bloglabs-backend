const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { validateComment } = require('../utils/validations');

const prisma = new PrismaClient();

module.exports.getComments = async (req, res, next) => {
  try {
    const comments = await prisma.comment.findMany({
      include: {
        author: false,
        post: false,
      },
    });
    res.status(200).json({ success: true, data: comments });
  } catch (err) {
    next(err);
  }
};

module.exports.getComment = async (req, res, next) => {
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        id: req.params.commentId,
      },
      include: {
        authorId: false,
        postId: false,
      },
    });
    res.status(200).json({ success: true, data: comment });
  } catch (err) {
    next(err);
  }
};

module.exports.postNewComment = [
  validateComment,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const newComment = await prisma.comment.create({
        data: {
          content: req.body.content,
          authorId: req.user.id,
          // come back to this and think about using params, would need to move routes so this is under /posts/:postId/comments
          postId: req.body.postId,
        },
      });
      res.status(201).json({ success: true, data: newComment });
    } catch (err) {
      next(err);
    }
  },
];

module.exports.updateComment = async (req, res, next) => {
  try {
    const updatedComment = await prisma.comment.update({
      where: {
        id: req.params.commentId,
      },
      data: {
        content: req.body.content,
      },
    });
    res.status(200).json({ success: true, data: updatedComment });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteComment = async (req, res, next) => {
  try {
    const deletedComment = await prisma.comment.delete({
      where: {
        id: req.params.commentId,
      },
    });
    res.status(200).json({ success: true, data: deletedComment });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteComments = async (req, res, next) => {
  const commentIds = req.body.commentsToDelete;
  try {
    const deletedComments = await prisma.comment.deleteMany({
      where: {
        id: {
          in: commentIds,
        },
      },
    });
    res.status(200).json({ success: true, data: deletedComments });
  } catch (err) {
    next(err);
  }
};
