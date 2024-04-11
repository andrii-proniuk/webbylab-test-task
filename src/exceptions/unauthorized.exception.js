const { StatusCodes } = require('http-status-codes');
const { BaseHttpException } = require('./base-http.exception');

class UnauthorizedException extends BaseHttpException {
  constructor(body = { message: 'Unauthorized' }) {
    super(StatusCodes.UNAUTHORIZED, body);
  }
}

module.exports = { UnauthorizedException };
