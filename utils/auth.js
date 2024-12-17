const asyncHandler = require('express-async-handler');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const CustomForbiddenError = require('../errors/CustomForbiddenError');

const notFound = asyncHandler(async (req, res, next) => {
  throw new CustomNotFoundError('This api route does not exist');
});

// const checkIfLoggedIn = asyncHandler(async (req, res, next) => {
//   passport.authenticate('jwt', { session: false }, (err, user, info) => {
//     // If authentication failed, `user` will be set to false. If an exception occurred, `err` will be set.
//     if (err || !user) {
//       // PASS THE ERROR OBJECT TO THE NEXT ROUTE i.e THE APP'S COMMON ERROR HANDLING MIDDLEWARE
//       throw new CustomUnauthorizedError(
//         'You are not authorized to view this route, you must log in',
//         String(info)
//       );
//     } else {
//       console.log(user);
//       next(user);
//     }
//   })(req, res, next);
// });

const checkIfAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.admin) {
    next();
  } else {
    throw new CustomForbiddenError('Only admins can access this route');
  }
});

module.exports = {
  // checkIfLoggedIn,
  notFound,
  checkIfAdmin,
};
