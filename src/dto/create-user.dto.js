const { z } = require('zod');
const {
  USERS_NAME_MIN_LENGTH,
  USERS_NAME_MAX_LENGTH,
  USERS_EMAIL_MIN_LENGTH,
  USERS_EMAIL_MAX_LENGTH,
  USERS_PASSWORD_MIN_LENGTH,
  USERS_PASSWORD_MAX_LENGTH,
  USERS_VALIDATION_ERRORS,
} = require('../constants/users.constants');

const CreateUserDtoValidationSchema = z
  .object({
    name: z.string().min(USERS_NAME_MIN_LENGTH).max(USERS_NAME_MAX_LENGTH),
    email: z
      .string()
      .min(USERS_EMAIL_MIN_LENGTH)
      .max(USERS_EMAIL_MAX_LENGTH)
      .email(),
    password: z
      .string()
      .min(USERS_PASSWORD_MIN_LENGTH)
      .max(USERS_PASSWORD_MAX_LENGTH),
    confirmPassword: z
      .string()
      .min(USERS_PASSWORD_MIN_LENGTH)
      .max(USERS_PASSWORD_MAX_LENGTH),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    path: ['confirmPassword'],
    message:
      USERS_VALIDATION_ERRORS.PASSWORD_AND_CONFIRM_PASSWORD_MUST_BE_EQUAL,
  });

/**
 * @typedef {import('zod').infer<CreateUserDtoValidationSchema>} CreateUserDto
 */

module.exports = { CreateUserDtoValidationSchema };
