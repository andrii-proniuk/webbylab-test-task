const { NotFoundException } = require('../exceptions/not-found.exception');
const { moviesRepository } = require('../repositories/movies.repository');

/**
 * @type {import('../types/globals').Guard}
 */
const movieExistsByIdGuard = async (req, res, next) => {
  const movieId = parseInt(req.params.id);

  const isMovieExists = await moviesRepository.existsById(movieId);

  if (!isMovieExists) {
    return next(new NotFoundException({ message: `Movie not found` }));
  }

  next();
};

module.exports = { movieExistsByIdGuard };
