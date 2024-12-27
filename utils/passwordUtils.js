require('dotenv/config');
const { PrismaClient } = require('@prisma/client');
const crypto = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

const prisma = new PrismaClient();

function validPassword(password, hash, salt) {
  const hashVerify = crypto.hashSync(password, salt);
  return hash === hashVerify;
}

function genPassword(password) {
  const salt = crypto.genSaltSync(10);
  const hash = crypto.hashSync(password, salt);

  return {
    salt,
    hash,
  };
}

async function issueJWT(user) {
  const { id } = user;
  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  };

  const accessToken = jsonwebtoken.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: '30s',
  });

  const refreshToken = jsonwebtoken.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: '1d',
  });

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      refresh: refreshToken,
    },
  });

  return {
    accessToken: {
      token: `Bearer ${accessToken}`,
      expires: accessToken.expiresIn,
    },
    refreshToken: {
      token: `Bearer ${refreshToken}`,
      expires: refreshToken.expiresIn,
    },
  };
}

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
};
