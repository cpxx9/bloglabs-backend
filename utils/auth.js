const asyncHandler = require('express-async-handler');
const { PrismaClient } = require('@prisma/client');
const CustomNotFoundError = require('../errors/CustomNotFoundError');
const CustomForbiddenError = require('../errors/CustomForbiddenError');

const prisma = new PrismaClient();

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

const checkIfAuthor = asyncHandler(async (req, res, next) => {
  if (req.user.author) {
    next();
  } else {
    throw new CustomForbiddenError('Only authors can access this route');
  }
});

const checkIfUserMatch = asyncHandler(async (req, res, next) => {
  if (req.user.id === req.params.userId) {
    next();
  } else {
    throw new CustomForbiddenError(
      'You must be logged in as this user to view account'
    );
  }
});

const checkUserAuthorMatch = asyncHandler(async (req, res, next) => {
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: req.params.postId,
      },
    });
    if (!post) {
      throw new CustomNotFoundError(
        'This post ID does not reference a valid post'
      );
    }
    if (post.authorId === req.user.id) {
      next();
    } else {
      throw new CustomForbiddenError('You must be the author of this post');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = {
  // checkIfLoggedIn,
  notFound,
  checkIfAdmin,
  checkIfAuthor,
  checkIfUserMatch,
  checkUserAuthorMatch,
};
