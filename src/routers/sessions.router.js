const { Router } = require('express');
const { sessionsController } = require('../controllers/sessions.controller');

const sessionsRouter = Router();

sessionsRouter.post('/', sessionsController.createSession);

module.exports = { sessionsRouter };
