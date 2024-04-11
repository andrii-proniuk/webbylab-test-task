const { StatusCodes } = require('http-status-codes');
const { BaseHttpException } = require('./base-http.exception');

class NotFoundException extends BaseHttpException {
  constructor(body) {
    super(StatusCodes.NOT_FOUND, body);
  }
}

module.exports = { NotFoundException };
