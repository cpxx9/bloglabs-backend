const { Router } = require('express');
const { usersRouter } = require('./usersRouter');
const { postsRouter } = require('./postsRouter');
const { commentRouter } = require('./commentRouter');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/posts', postsRouter);
indexRouter.use('/comments', commentRouter);

module.exports = {
  indexRouter,
};
