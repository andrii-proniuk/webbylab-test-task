const { ZodError, ZodSchema } = require('zod');
const { BadRequestException } = require('../exceptions/bad-request.exception');

/**
 * @type {(schema: ZodSchema<any>) => import('../types/globals').Middleware}
 */
const validateBodyMiddleware = (schema) => async (req, res, next) => {
  const { body } = req;

  if (!body) {
    next(
      new BadRequestException({
        message: 'body is required',
      }),
    );
  }

  if (typeof body !== 'object') {
    next(
      new BadRequestException({
        message: 'body must be an object',
      }),
    );
  }

  try {
    req.body = await schema.parseAsync(body);
  } catch (e) {
    if (!(e instanceof ZodError)) {
      return next(e);
    }

    const errors = e.errors.reduce((acc, error) => {
      const errorPath = error.path.join('.');

      if (!acc[errorPath]) {
        acc[errorPath] = error.message;
      }

      return acc;
    }, {});

    return next(
      new BadRequestException({
        message: 'Body Validation Error',
        errors,
      }),
    );
  }

  next();
};

module.exports = { validateBodyMiddleware };
