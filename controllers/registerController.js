const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { genPassword, issueJWT } = require('../utils/passwordUtils');
const { validateUser } = require('../utils/validations');
const { prismaErrController } = require('../middleware/errorController');

const prisma = new PrismaClient();

const postNewUser = [
  validateUser,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { salt, hash } = genPassword(req.body.password);
    try {
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          hash,
          salt,
        },
      });
      const tokens = await issueJWT(user);
      const accessTokenObject = tokens.accessToken;
      const refreshToken = tokens.refreshToken.token.split(' ')[1];
      res.cookie('jwt', refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      delete user.refresh;
      res.status(201).json({
        success: true,
        token: accessTokenObject.token,
        expiresIn: accessTokenObject.expires,
        user,
      });
    } catch (err) {
      const newErr = prismaErrController(err);
      return next(newErr);
    }
  },
];

module.exports = {
  postNewUser,
};
