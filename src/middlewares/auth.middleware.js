const {
  UnauthorizedException,
} = require('../exceptions/unauthorized.exception');
const { verifyJwtToken } = require('../utils/jwt.utils');

/**
 * @param {string | undefined} authHeader
 * @returns {string | undefined}
 */
const getBearerToken = (authHeader) => {
  if (!authHeader) {
    return;
  }

  const [bearer, token] = authHeader.split(' ');

  return bearer === 'Bearer' ? token : undefined;
};

/**
 * @type {import('../types/globals').Middleware}
 */
const authMiddleware = async (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);

  if (!token) {
    return next(new UnauthorizedException());
  }

  let payload;

  try {
    payload = await verifyJwtToken(token);
  } catch (e) {
    return next(new UnauthorizedException());
  }

  req.user = payload;

  next();
};

module.exports = { authMiddleware };
