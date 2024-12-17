const passport = require('passport');
const { Router } = require('express');
const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');
const { checkIfAdmin } = require('../utils/auth');
const { listUsers } = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use('/login', loginRouter);
usersRouter.use('/register', registerRouter);

usersRouter.all(
  '*',
  passport.authenticate('jwt', { session: false }),
  checkIfAdmin
);
usersRouter.get('/', listUsers);

module.exports = { usersRouter };
