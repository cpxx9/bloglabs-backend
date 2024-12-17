const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('@prisma/client');
const { genPassword, issueJWT } = require('../utils/passwordUtils');

const prisma = new PrismaClient();

const nameAlphaErr = 'must only contain letters.';
const nameLengthErr = 'must be between 1 and 25 characters.';
const emailErr = 'Must be a valid email address.';
const passLengthErr = 'must be between 8 and 32 characters.';
const passMatchErr = 'Passwords must match.';

const validateUser = [
  body('firstname')
    .trim()
    .isAlpha()
    .withMessage(`First name ${nameAlphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`First name ${nameLengthErr}`),
  body('lastname')
    .trim()
    .isAlpha()
    .withMessage(`Last name ${nameAlphaErr}`)
    .isLength({ min: 1, max: 25 })
    .withMessage(`Last name ${nameLengthErr}`),
  body('email').trim().isEmail().withMessage(emailErr),
  body('password')
    .trim()
    .isLength({ min: 8, max: 32 })
    .withMessage(`Password ${passLengthErr}`),
  body('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage(passMatchErr),
];

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
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          email: req.body.email,
          hash,
          salt,
        },
      });
      const tokenObject = issueJWT(user);
      res.json({
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
        user,
      });
    } catch (err) {
      return next(err);
    }
  },
];

module.exports = {
  postNewUser,
};
