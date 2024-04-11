const { StatusCodes } = require('http-status-codes');
const { BaseHttpException } = require('./base-http.exception');

class BadRequestException extends BaseHttpException {
  constructor(body) {
    super(StatusCodes.BAD_REQUEST, body);
  }
}

module.exports = { BadRequestException };
