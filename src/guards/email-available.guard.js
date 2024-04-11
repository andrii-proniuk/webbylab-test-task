const { USERS_ERRORS } = require('../constants/users.constants');
const { BadRequestException } = require('../exceptions/bad-request.exception');
const { usersRepository } = require('../repositories/users.repository');

/**
 * @type {import('../types/globals').Guard}
 */
const emailAvailableGuard = async (req, res, next) => {
  const isEmailExists = await usersRepository.getByEmail(req.body.email);

  if (isEmailExists) {
    return next(
      new BadRequestException({
        message: USERS_ERRORS.EMAIL_ALREADY_EXISTS,
      }),
    );
  }

  next();
};

module.exports = { emailAvailableGuard };
