const { Op, WhereOptions, Transaction, Model } = require('sequelize');
const { Actor } = require('../models/actor.model');
const { MovieActor } = require('../models/movie-actor.model');
const { Movie } = require('../models/movie.model');
const { actorsRepository } = require('./actors.repository');
const {
  MOVIES_TITLE_CHARACTERS_ORDER_MAP,
  MOVIES_ORDER_PROPERTY,
} = require('../constants/movies.constants');

/**
 * @param {string} searchParam
 * @return {Promise<number[]>}
 */
const getMoviesIdsByActor = async (searchParam) => {
  const actors = await Actor.findAll({
    where: {
      name: {
        [Op.like]: `%${searchParam}%`,
      },
    },
    include: [Actor.MovieActor],
  });

  const moviesIds = actors.flatMap(({ movieActors }) =>
    movieActors.map(({ movieId }) => movieId),
  );

  return moviesIds;
};

/**
 * @param {string} param
 * @returns {WhereOptions<import('../models/movie.model').MovieAttributes>}
 */
const composeMovieFilter = (param) => ({
  title: {
    [Op.like]: `%${param}%`,
  },
});

/**
 *
 * @param {number[]} moviesIds
 * @returns {WhereOptions<import('../models/movie.model').MovieAttributes>}
 */
const composeActorFilter = (moviesIds) => ({
  id: {
    [Op.in]: moviesIds,
  },
});

/**
 * @param {import('../dto/get-movies.dto').GetMoviesDto} getMoviesDto
 * @returns {WhereOptions<import('../models/movie.model').MovieAttributes>}
 */
// eslint-disable-next-line complexity
const composeSearchWhereParams = async (getMoviesDto) => {
  const { search, title, actor } = getMoviesDto;

  const isMovieFilterExists = !!search || !!title;
  const isActorFilterExists = !!search || (!title && !!actor);
  const isNoFilters = !isMovieFilterExists && !isActorFilterExists;

  if (isNoFilters) {
    return;
  }

  if (!isActorFilterExists) {
    return composeMovieFilter(search || title);
  }

  const moviesIds = await getMoviesIdsByActor(search || actor);

  if (!isMovieFilterExists) {
    return composeActorFilter(moviesIds);
  }

  return {
    [Op.or]: [
      composeActorFilter(moviesIds),
      composeMovieFilter(search || title),
    ],
  };
};

/**
 * @param {number} movieId
 * @param {string[]} newActorsNames
 * @param {Transaction} transaction
 */
const updateMovieActors = async (movieId, newActorsNames, transaction) => {
  const newActors = await actorsRepository.findOrCreateByNames(
    newActorsNames,
    transaction,
  );

  await MovieActor.destroy({ where: { movieId }, transaction });

  await MovieActor.bulkCreate(
    newActors.map(({ id }) => ({ movieId, actorId: id })),
    { transaction },
  );
};

/**
 * @param {string} title
 * @returns {string}
 */
const transformTitleToTitleOrder = (title) => {
  const letters = title.toLowerCase().split('');

  return letters
    .map((letter) => {
      return MOVIES_TITLE_CHARACTERS_ORDER_MAP[letter]
        .toString()
        .padStart(2, '0');
    })
    .join('');
};

const moviesRepository = {
  /**
   * @param {import('../dto/create-movie.dto').CreateMovieDto} createMovieDto
   * @param {Transaction} transaction
   * @returns {number} id of created movie
   */
  create: async ({ title, year, format, actors: actorsNames }, transaction) => {
    const titleOrder = transformTitleToTitleOrder(title);
    const movie = await Movie.create(
      { title, titleOrder, year, format },
      { transaction },
    );

    const actors = await actorsRepository.findOrCreateByNames(
      actorsNames,
      transaction,
    );

    await MovieActor.bulkCreate(
      actors.map((actor) => ({ movieId: movie.id, actorId: actor.id })),
      { transaction },
    );

    return movie.id;
  },

  /**
   * @param {import('../dto/create-movie.dto').CreateMovieDto[]} moviesData
   * @param {Transaction} transaction
   * @returns {Promise<Movie>}
   */
  createMany: async (moviesData, transaction) => {
    const alreadyExistMovies = await Movie.findAll({
      where: {
        title: {
          [Op.in]: moviesData.map(({ title }) => title),
        },
      },
    });

    const moviesToCreate = moviesData
      .filter(
        ({ title }) =>
          !alreadyExistMovies.find((movie) => movie.title === title),
      )
      .map((movie) => {
        const titleOrder = transformTitleToTitleOrder(movie.title);

        return {
          ...movie,
          titleOrder,
        };
      });

    const createdMovies = await Movie.bulkCreate(moviesToCreate, {
      transaction,
    });

    const createdMoviesMap = createdMovies.reduce(
      (map, movie) => map.set(movie.title, movie),
      new Map(),
    );

    const movieActorsToCreate = moviesToCreate.flatMap(({ title, actors }) => {
      const movieId = createdMoviesMap.get(title).id;

      return actors.map((actorId) => ({ movieId, actorId }));
    });

    await MovieActor.bulkCreate(movieActorsToCreate, { transaction });

    return createdMovies;
  },

  /**
   * @param {import('../dto/get-movies.dto').GetMoviesDto} getMoviesDto
   * @param {Transaction} transaction
   * @returns {Promise<{ rows: Movie[]; count: number }>}
   */
  get: async (getMoviesDto, transaction) => {
    const { order, limit, offset } = getMoviesDto;
    const sort =
      getMoviesDto.sort === MOVIES_ORDER_PROPERTY.TITLE
        ? 'titleOrder'
        : getMoviesDto.sort;

    const where = await composeSearchWhereParams(getMoviesDto);

    const [rows, count] = await Promise.all([
      Movie.findAll({
        where,
        order: [[sort, order]],
        limit,
        offset,
        transaction,
        include: [
          {
            model: Actor,
            as: 'actors',
            through: { attributes: [] },
          },
        ],
      }),
      Movie.count({ where }),
    ]);

    return { rows, count };
  },

  /**
   * get movies by provided id
   * @param {number} id movie id to get
   * @param {Transaction} transaction - transaction
   * @returns {Promise<import('../models/movie.model').MovieEntity>} - return
   */
  getById: async (id, transaction) =>
    Movie.findByPk(id, {
      include: [
        {
          model: Actor,
          as: 'actors',
          through: { attributes: [] },
        },
      ],
      transaction,
    }),

  /**
   * @param {string} title
   * @returns {import('../models/movie.model').Movie}
   */
  getByTitle: async (title) =>
    Movie.findOne({
      where: {
        title: {
          [Op.like]: title,
        },
      },
    }),

  /**
   * @param {number} id
   * @param {import('../dto/update-movie.dto').UpdateMovieDto} updateMovieDto
   * @param {Transaction} transaction
   */
  update: async (id, updateMovieDto, transaction) => {
    const { title, year, format, actors } = updateMovieDto;

    await Movie.update({ title, year, format }, { where: { id }, transaction });

    if (!actors) {
      return;
    }

    const uniqueActorsNames = Array.from(new Set(actors));

    await updateMovieActors(id, uniqueActorsNames, transaction);
  },

  /**
   * @param {number} id
   * @param {Transaction} transaction
   */
  deleteById: async (id, transaction) => {
    await MovieActor.destroy({ where: { MovieId: id }, transaction });
    await Movie.destroy({ where: { id }, transaction });
  },

  /**
   * @param {number} id
   * @return {Promise<boolean>}
   */
  existsById: async (id) => {
    const movie = await Movie.findOne({ where: { id } });

    return !!movie;
  },
};

module.exports = { moviesRepository };
