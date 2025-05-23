const passport = require('passport');
require('../config/passport')(passport);
const { Router } = require('express');
const { checkIfAuthor, checkUserAuthorMatch } = require('../middleware/auth');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/postController');

const postsRouter = Router();

postsRouter.get('/', getPosts);
postsRouter.get('/:postId', getPost);
postsRouter.all(
  '*',
  passport.authenticate('jwt', { session: false }),
  checkIfAuthor
);
postsRouter.post('/', createPost);
postsRouter.put('/:postId', checkUserAuthorMatch, updatePost);
postsRouter.delete('/:postId', checkUserAuthorMatch, deletePost);

module.exports = {
  postsRouter,
};
