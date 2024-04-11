const { StatusCodes } = require('http-status-codes');
const { usersService } = require('../services/users.service');

const usersController = {
  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  create: async (req, res, next) => {
    const response = await usersService.create(req.body);

    res.status(StatusCodes.CREATED).json(response);
  },
};

module.exports = { usersController };
