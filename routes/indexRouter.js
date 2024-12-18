const { Router } = require('express');
const { usersRouter } = require('./usersRouter');
const { postsRouter } = require('./postsRouter');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.use('/posts', postsRouter);

module.exports = {
  indexRouter,
};
