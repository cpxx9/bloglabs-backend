const passport = require('passport');
const { Router } = require('express');
const { registerRouter } = require('./registerRouter');
const { checkIfAdmin, checkIfUserMatch } = require('../utils/auth');
const {
  listUsers,
  listUser,
  updateUser,
  deleteUser,
} = require('../controllers/usersController');

const usersRouter = Router();
usersRouter.use('/', registerRouter);

usersRouter.all('*', passport.authenticate('jwt', { session: false }));
usersRouter.get('/', checkIfAdmin, listUsers);
usersRouter.use('/:userId', checkIfUserMatch);
usersRouter.get('/:userId', listUser);
usersRouter.put('/:userId', updateUser);
usersRouter.delete('/:userId', deleteUser);

module.exports = { usersRouter };
