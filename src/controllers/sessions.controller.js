const { StatusCodes } = require('http-status-codes');
const { sessionsService } = require('../services/sessions.service');

const sessionsController = {
  /**
   * @type {import('../types/globals').ExpressFunction}
   */
  createSession: async (req, res, next) => {
    const { body: createSessionDto } = req;

    let token;

    try {
      token = await sessionsService.createSession(createSessionDto);
    } catch (e) {
      return next(e);
    }

    res.status(StatusCodes.OK).json({
      token,
      status: 1,
    });
  },
};

module.exports = { sessionsController };
