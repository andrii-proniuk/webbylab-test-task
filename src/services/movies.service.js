const { BadRequestException } = require('../exceptions/bad-request.exception');
const { moviesRepository } = require('../repositories/movies.repository');
const { actorsRepository } = require('../repositories/actors.repository');
const { CreateMovieDtoValidationSchema } = require('../dto/create-movie.dto');
const { runWithTransaction } = require('../utils/run-with-transaction.util');
const {
  MOVIES_IMPORT_LABEL_TO_PROPERTY_MAP,
  MOVIES_IMPORT_PROPERTIES,
} = require('../constants/movies.constants');
const { Transaction } = require('sequelize');

/**
 * @param {string} movieBlock
 * @param {number} index
 * @returns {{ line: number; info: string }}
 */
const composeBlockMetadata = (movieBlock, index) => ({
  line: index * 6 + 1,
  info: movieBlock,
});

/**
 * @param {import('../dto/create-movie.dto').CreateMovieDto} movie
 * @returns
 */
const validateMovieData = async (movie) => {
  try {
    const validatedMovie =
      await CreateMovieDtoValidationSchema.parseAsync(movie);

    return validatedMovie;
  } catch (e) {
    const errors = e.errors.reduce((acc, error) => {
      acc[error.path.join('.')] = error.message;

      return acc;
    }, {});

    throw new BadRequestException({
      message: 'Validation error',
      errors,
      ...composeBlockMetadata(movieBlock, index),
    });
  }
};

/**
 * @param {string} movieBlock block of movie info from file
 * @param {number} index index of movie block
 * @returns {CreateMovieDto} validated movie info
 */
const composeMovieData = async (movieBlock, index) => {
  const lines = movieBlock.split('\r\n');

  if (lines.length !== 4) {
    throw new BadRequestException({
      message: 'movie block can contain only 4 properties',
      ...composeBlockMetadata(movieBlock, index),
    });
  }

  const movie = lines.reduce((movie, line) => {
    const [label, value] = line.split(': ');

    if (!MOVIES_IMPORT_LABEL_TO_PROPERTY_MAP.hasOwnProperty(label)) {
      throw new BadRequestException({
        message: 'unknown label in movie block',
        ...composeBlockMetadata(movieBlock, index),
      });
    }

    const property = MOVIES_IMPORT_LABEL_TO_PROPERTY_MAP[label];

    if (movie[property]) {
      throw new BadRequestException({
        message: 'duplicated label in one movie block',
        ...composeBlockMetadata(movieBlock, index),
      });
    }

    movie[property] =
      property === MOVIES_IMPORT_PROPERTIES.ACTORS ? value.split(', ') : value;

    return movie;
  }, {});

  const validatedMovie = await validateMovieData(movie);

  return validatedMovie;
};

/**
 * @param {string[]} actorsNames
 * @param {Transaction} transaction
 * @returns {Map<string, number>}
 */
const loadActorsMap = async (actorsNames, transaction) => {
  const uniqueActorsNames = [...new Set(actorsNames)];

  const actors = await actorsRepository.findOrCreateByNames(
    uniqueActorsNames,
    transaction,
  );

  return new Map(actors.map(({ id, name }) => [name, id]));
};

const moviesService = {
  /**
   * @param {import('../dto/create-movie.dto').CreateMovieDto} createMovieDto
   */
  create: async (createMovieDto) => {
    const movieId = await runWithTransaction(async (transaction) => {
      return moviesRepository.create(createMovieDto, transaction);
    });

    const movie = await moviesRepository.getById(movieId);

    return {
      data: movie,
      status: 1,
    };
  },

  /**
   * @param {import('../dto/get-movies.dto').GetMoviesDto} getMoviesDto
   */
  search: async (getMoviesDto) => {
    const { rows, count } = await moviesRepository.get(getMoviesDto);

    return {
      data: rows,
      meta: {
        total: count,
      },
      status: 1,
    };
  },

  /**
   * @param {number} id
   */
  getById: async (id) => {
    const movie = await moviesRepository.getById(id);

    return {
      data: movie,
      status: 1,
    };
  },

  /**
   * @param {number} id
   * @param {import('../dto/update-movie.dto').UpdateMovieDto} updateMovieDto
   */
  update: async (id, updateMovieDto) => {
    await runWithTransaction(async (transaction) => {
      await moviesRepository.update(id, updateMovieDto, transaction);
    });

    const movie = await moviesRepository.getById(id);

    return {
      data: movie,
      status: 1,
    };
  },

  /**
   * @param {string} fileContent
   */
  importFromFile: async (fileContent) => {
    const movieBlocks = fileContent.split('\r\n\r\n\r\n');

    const moviesFromFile = [];

    for (const [index, movieBlock] of movieBlocks.entries()) {
      const movie = await composeMovieData(movieBlock, index);

      moviesFromFile.push(movie);
    }

    const actorsNames = moviesFromFile.flatMap((movie) => movie.actors);

    const createdMovies = await runWithTransaction(async (transaction) => {
      const actorsMap = await loadActorsMap(actorsNames, transaction);

      const moviesToCreate = moviesFromFile.map(({ actors, ...movieData }) => ({
        ...movieData,
        actors: actors.map((actorName) => actorsMap.get(actorName)),
      }));

      return moviesRepository.createMany(moviesToCreate, transaction);
    });

    return {
      data: createdMovies,
      meta: {
        total: moviesFromFile.length,
        imported: createdMovies.length,
      },
      status: 1,
    };
  },

  /**
   * @param {number} id
   */
  deleteById: async (id) => {
    await runWithTransaction(async (transaction) => {
      await moviesRepository.deleteById(id, transaction);
    });

    return {
      status: 1,
    };
  },
};

module.exports = { moviesService };
