const { BadRequestException } = require('../exceptions/bad-request.exception');
const { moviesRepository } = require('../repositories/movies.repository');

/**
 * @type {import('../types/globals').Guard}
 */
const movieTitleAvailableGuard = async (req, res, next) => {
  const { title } = req.body;

  const movie = await moviesRepository.getByTitle(title);

  if (movie) {
    return next(
      new BadRequestException({
        message: 'movie with provided title already exists',
      }),
    );
  }

  next();
};

module.exports = { movieTitleAvailableGuard };
