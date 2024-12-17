require('dotenv/config');
const crypto = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');

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

function issueJWT(user) {
  const id = user.id;
  const expiresIn = '1d';
  const payload = {
    sub: id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, process.env.SECRET, {
    expiresIn: expiresIn,
  });

  return {
    token: 'Bearer ' + signedToken,
    expires: expiresIn,
  };
}

module.exports = {
  validPassword,
  genPassword,
  issueJWT,
};
