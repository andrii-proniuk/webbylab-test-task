const jwt = require('jsonwebtoken');
const { authConfig } = require('../configs/auth.config');

const generateJwtToken = async (user) => {
  const { id } = user;

  return jwt.sign({ id }, authConfig.jwt.secret);
};

const verifyJwtToken = async (token) =>
  jwt.verify(token, authConfig.jwt.secret, { maxAge: authConfig.jwt.maxAge });

module.exports = {
  generateJwtToken,
  verifyJwtToken,
};
