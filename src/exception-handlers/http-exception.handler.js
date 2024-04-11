const { BaseHttpException } = require('../exceptions/base-http.exception');

/**
 * @type {import('../types/globals').ExceptionHandler}
 */
// eslint-disable-next-line max-params
const httpExceptionHandler = (err, req, res, next) => {
  if (!(err instanceof BaseHttpException)) {
    return next(err);
  }

  res.status(err.getStatus()).json(err.getBody());
};

module.exports = { httpExceptionHandler };
