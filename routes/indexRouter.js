const { Router } = require('express');
const { usersRouter } = require('./usersRouter');
const { postsRouter } = require('./postsRouter');
const { commentRouter } = require('./commentRouter');
const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');
const { refreshRouter } = require('./refreshRouter');

const indexRouter = Router();

indexRouter.use('/register', registerRouter);
indexRouter.use('/login', loginRouter);
indexRouter.use('/refresh', refreshRouter);
indexRouter.use('/users', usersRouter);
indexRouter.use('/posts', postsRouter);
indexRouter.use('/comments', commentRouter);

module.exports = {
  indexRouter,
};
