const { Router } = require('express');
const passport = require('passport');
const { displayHome } = require('../controllers/indexController');
const { usersRouter } = require('./usersRouter');
const { checkIfLoggedIn, checkIfAdmin } = require('../utils/auth');
const { adminRouter } = require('./adminRouter');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);
indexRouter.all('*', passport.authenticate('jwt', { session: false }));
indexRouter.get('/', displayHome);
indexRouter.use('/admin', checkIfAdmin, adminRouter);

module.exports = {
  indexRouter,
};
