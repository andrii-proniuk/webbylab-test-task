const { z } = require('zod');
const { BadRequestException } = require('../exceptions/bad-request.exception');

const integerValidator = z.coerce.number().int().min(1);

/**
 * @type {import('../types/globals').Middleware}
 */
const validateParamIdMiddleware = async (req, res, next) => {
  const { id } = req.params;

  try {
    await integerValidator.parseAsync(id);
  } catch {
    return next(
      new BadRequestException({
        message: 'Param Validation Error',
        error: 'param id must be a positive integer',
      }),
    );
  }

  next();
};

module.exports = { validateParamIdMiddleware };
