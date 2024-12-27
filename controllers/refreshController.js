require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient();

const refreshController = async (req, res, next) => {
  const { cookies } = req;
  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ success: false, msg: 'No token present in request' });
  const refreshToken = cookies.jwt;
  const dbToken = refreshToken.split(' ')[1];
  try {
    const user = await prisma.user.findFirst({
      where: {
        refresh: dbToken,
      },
    });

    if (!user) {
      return res.status(403).json({ success: false, msg: 'Incorrect token' });
    }

    jwt.verify(dbToken, process.env.REFRESH_SECRET, (err, decoded) => {
      if (err || user.id !== decoded.sub)
        return res
          .status(403)
          .json({ success: false, msg: 'Invalid response' });
      const accessToken = jwt.sign(
        { sub: user.id, iat: Date.now() },
        process.env.ACCESS_SECRET,
        { expiresIn: '10m' }
      );
      res.status(200).json({
        success: true,
        token: `Bearer ${accessToken}`,
        expiresIn: '10m',
        user,
      });
    });
  } catch (err) {
    return next(err);
  }
};

module.exports = { refreshController };
