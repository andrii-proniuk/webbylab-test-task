const { z } = require('zod');
const {
  MOVIES_MIN_YEAR,
  MOVIES_MAX_YEAR,
  MOVIES_ACCEPTED_FORMATS,
  MOVIES_ACTORS_ARRAY_MIN_LENGTH,
  MOVIES_ACTORS_ARRAY_MAX_LENGTH,
  MOVIES_TITLE_MIN_LENGTH,
  MOVIES_TITLE_MAX_LENGTH,
  MOVIES_ACTOR_NAME_MIN_LENGTH,
  MOVIES_ACTOR_NAME_MAX_LENGTH,
  MOVIES_ACTOR_NAME_REGEX,
  MOVIES_VALIDATION_ERRORS,
  MOVIES_TITLE_REGEX,
} = require('../constants/movies.constants');

const CreateMovieDtoValidationSchema = z.object({
  title: z
    .string()
    .trim()
    .min(MOVIES_TITLE_MIN_LENGTH)
    .max(MOVIES_TITLE_MAX_LENGTH)
    .regex(MOVIES_TITLE_REGEX, MOVIES_VALIDATION_ERRORS.TITLE_INVALID),
  year: z.coerce.number().min(MOVIES_MIN_YEAR).max(MOVIES_MAX_YEAR),
  format: z.enum(MOVIES_ACCEPTED_FORMATS),
  actors: z
    .array(
      z
        .string()
        .trim()
        .min(MOVIES_ACTOR_NAME_MIN_LENGTH)
        .max(MOVIES_ACTOR_NAME_MAX_LENGTH)
        .regex(
          MOVIES_ACTOR_NAME_REGEX,
          MOVIES_VALIDATION_ERRORS.ACTOR_NAME_INVALID,
        ),
    )
    .min(MOVIES_ACTORS_ARRAY_MIN_LENGTH)
    .max(MOVIES_ACTORS_ARRAY_MAX_LENGTH),
});

/**
 * @typedef {import('zod').infer<CreateMovieDtoValidationSchema>} CreateMovieDto
 */

module.exports = { CreateMovieDtoValidationSchema };
