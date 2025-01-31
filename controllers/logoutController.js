const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const logoutController = async (req, res, next) => {
  // On frontend, delete the access token from memory
  const { cookies } = req;
  if (!cookies?.jwt) return res.sendStatus(204);
  const refreshToken = cookies.jwt;
  console.log('refresh', refreshToken);
  try {
    const user = await prisma.user.findFirst({
      where: {
        refresh: refreshToken,
      },
    });
    console.log(user);
    if (!user) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        refresh: '',
      },
    });
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // add secure: true - https
    console.log(res);
    res.sendStatus(204);
  } catch (err) {
    return next(err);
  }
};

module.exports = { logoutController };
