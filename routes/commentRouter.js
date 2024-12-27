const passport = require('passport');
require('../config/passport')(passport);
const { Router } = require('express');
const { checkIfAdmin, checkUserCommentMatch } = require('../middleware/auth');
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
commentRouter.put('/:commentId', checkUserCommentMatch, updateComment);
commentRouter.delete('/:commentId', checkUserCommentMatch, deleteComment);

module.exports = {
  commentRouter,
};
