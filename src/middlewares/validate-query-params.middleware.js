const { ZodError, ZodSchema } = require('zod');
const { BadRequestException } = require('../exceptions/bad-request.exception');

/**
 * @type {(schema: ZodSchema<any>) => import('../types/globals').Middleware}
 */
const validateQueryParamsMiddleware = (schema) => async (req, res, next) => {
  try {
    req.query = await schema.parseAsync(req.query);
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
        message: 'Query Params Validation Error',
        errors,
      }),
    );
  }

  next();
};

module.exports = { validateQueryParamsMiddleware };
