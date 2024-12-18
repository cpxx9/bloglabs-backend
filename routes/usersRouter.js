const passport = require('passport');
const { Router } = require('express');
const { loginRouter } = require('./loginRouter');
const { registerRouter } = require('./registerRouter');
const { checkIfAdmin, checkIfUserMatch } = require('../utils/auth');
const {
  listUsers,
  listUser,
  updateUser,
} = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use('/login', loginRouter);
usersRouter.use('/register', registerRouter);

usersRouter.all('*', passport.authenticate('jwt', { session: false }));
usersRouter.get('/', checkIfAdmin, listUsers);
usersRouter.use('/:username', checkIfUserMatch);
usersRouter.get('/:username', listUser);
usersRouter.put('/:username', updateUser);

module.exports = { usersRouter };
