const { CreateMovieDtoValidationSchema } = require('./create-movie.dto');

const UpdateMovieDtoValidationSchema = CreateMovieDtoValidationSchema.partial();

/**
 * @typedef {Partial<import('./create-movie.dto').CreateMovieDto>} UpdateMovieDto
 */

module.exports = { UpdateMovieDtoValidationSchema };
