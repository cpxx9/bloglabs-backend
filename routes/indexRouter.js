const { Router } = require('express');
const { displayHome } = require('../controllers/indexController');
const { usersRouter } = require('./usersRouter');
const passport = require('passport');

const indexRouter = Router();

indexRouter.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  displayHome
);

indexRouter.use('/users', usersRouter);

module.exports = {
  indexRouter,
};
