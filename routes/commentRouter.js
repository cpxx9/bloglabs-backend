const passport = require('passport');
const { Router } = require('express');
const { checkIfAdmin } = require('../utils/auth');
const {
  getComments,
  getComment,
  postNewComment,
  updateComment,
  deleteComment,
} = require('../controllers/commentController');

const commentRouter = Router();
commentRouter.all('*', passport.authenticate('jwt', { session: false }));
commentRouter.get('/', checkIfAdmin, getComments);
commentRouter.get('/:commentId', checkIfAdmin, getComment);
commentRouter.post('/', postNewComment);
commentRouter.put('/:commentId', updateComment);
commentRouter.delete('/:commentId', deleteComment);

module.exports = {
  commentRouter,
};
