const { Router } = require('express');
const passport = require('passport');
const { displayHome } = require('../controllers/indexController');
const { usersRouter } = require('./usersRouter');
const { checkIfLoggedIn } = require('../utils/auth');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.all('*', passport.authenticate('jwt', { session: false }));
indexRouter.get('/', displayHome);

module.exports = {
  indexRouter,
};
