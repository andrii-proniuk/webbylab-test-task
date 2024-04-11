const { z } = require('zod');
const {
  MOVIES_MIN_YEAR,
  MOVIES_MAX_YEAR,
  MOVIES_ACCEPTED_FORMATS,
  MOVIES_ACTORS_ARRAY_MIN_LENGTH,
  MOVIES_ACTORS_ARRAY_MAX_LENGTH,
} = require('../constants/movies.constants');

const CreateMovieDtoValidationSchema = z.object({
  title: z.string().trim(),
  year: z.coerce.number().min(MOVIES_MIN_YEAR).max(MOVIES_MAX_YEAR),
  format: z.enum(MOVIES_ACCEPTED_FORMATS),
  actors: z
    .array(z.string().trim())
    .min(MOVIES_ACTORS_ARRAY_MIN_LENGTH)
    .max(MOVIES_ACTORS_ARRAY_MAX_LENGTH),
});

/**
 * @typedef {import('zod').infer<CreateMovieDtoValidationSchema>} CreateMovieDto
 */

module.exports = { CreateMovieDtoValidationSchema };
