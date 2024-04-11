const { CreateUserDtoValidationSchema } = require('./create-user.dto');

const CreateSessionDtoValidationSchema = CreateUserDtoValidationSchema.pick({
  email: true,
  password: true,
});

/**
 * @typedef {Pick<import('./create-user.dto').CreateUserDto, 'email' | 'password'>} CreateSessionDto
 */

module.exports = { CreateSessionDtoValidationSchema };
