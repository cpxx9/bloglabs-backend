const { Router } = require('express');
const { usersRouter } = require('./usersRouter');

const indexRouter = Router();

indexRouter.use('/users', usersRouter);

module.exports = {
  indexRouter,
};
