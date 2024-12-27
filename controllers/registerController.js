const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { genPassword, issueJWT } = require('../utils/passwordUtils');
const { validateUser } = require('../utils/validations');

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
      const tokenObject = issueJWT(user);
      res.status(201).json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        user,
      });
    } catch (err) {
      switch (err.code) {
        case 'P2002':
          err.name = `Prisma Error: ${err.code}`;
          err.statusCode = 409;
          err.message = `${err.meta.target[0]} field must be unique!`;
          break;
        default:
      }
      return next(err);
    }
  },
];

module.exports = {
  postNewUser,
};
