const { Router } = require('express');
const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');

const usersRouter = Router();

usersRouter.use('/login', loginRouter);
usersRouter.use('/register', registerRouter);

module.exports = { usersRouter };
