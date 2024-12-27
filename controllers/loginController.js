const { validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { validPassword, issueJWT } = require('../utils/passwordUtils');
const { validateLogin } = require('../utils/validations');

const prisma = new PrismaClient();

const loginController = [
  validateLogin,
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: req.body.username,
        },
      });

      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'incorrect email or password' });
      }

      const isValid = validPassword(req.body.password, user.hash, user.salt);

      if (isValid) {
        const tokenObject = issueJWT(user);
        res.status(200).json({
          success: true,
          token: tokenObject.token,
          expiresIn: tokenObject.expires,
        });
      } else {
        res
          .status(401)
          .json({ success: false, msg: 'incorrect email or password' });
      }
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  loginController,
};
