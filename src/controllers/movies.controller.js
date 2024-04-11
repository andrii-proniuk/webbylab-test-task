const { StatusCodes } = require('http-status-codes');
const { moviesService } = require('../services/movies.service');
const { BadRequestException } = require('../exceptions/bad-request.exception');

const moviesController = {
  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  create: async (req, res, next) => {
    let response;

    try {
      response = await moviesService.create(req.body);
    } catch (e) {
      return next(e);
    }

    res.status(StatusCodes.CREATED).json(response);
  },

  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  getById: async (req, res, next) => {
    const movieId = parseInt(req.params.id);

    let response;

    try {
      response = await moviesService.getById(movieId);
    } catch (e) {
      return next(e);
    }

    res.status(StatusCodes.OK).json(response);
  },

  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  search: async (req, res, next) => {
    const response = await moviesService.search(req.query);

    res.status(StatusCodes.OK).json(response);
  },

  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  update: async (req, res, next) => {
    const movieId = parseInt(req.params.id);

    const response = await moviesService.update(movieId, req.body);

    res.status(StatusCodes.OK).json(response);
  },

  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  deleteById: async (req, res, next) => {
    const response = await moviesService.deleteById(req.params.id);

    res.status(StatusCodes.OK).json(response);
  },

  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  importFromFile: async (req, res, next) => {
    if (!req.file) {
      return next(
        new BadRequestException({
          message: 'file with movies data is required',
        }),
      );
    }

    const fileContent = req.file.buffer.toString().replace(/^\uFEFF/, '');

    try {
      const response = await moviesService.importFromFile(fileContent);

      res.status(StatusCodes.CREATED).json(response);
    } catch (e) {
      next(e);
    }
  },
};

module.exports = { moviesController };
