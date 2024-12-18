const passport = require('passport');
const { Router } = require('express');
const { checkIfAuthor, checkUserAuthorMatch } = require('../utils/auth');
const {
  getPosts,
  getPost,
  createPost,
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
postsRouter.put('/:postId', checkUserAuthorMatch);

module.exports = {
  postsRouter,
};
