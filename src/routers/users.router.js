const { Router } = require('express');
const {
  validateBodyMiddleware,
} = require('../middlewares/validate-body.middleware');
const { CreateUserDtoValidationSchema } = require('../dto/create-user.dto');
const { usersController } = require('../controllers/users.controller');
const { emailAvailableGuard } = require('../guards/email-available.guard');

const usersRouter = Router();

usersRouter.post(
  '/',
  validateBodyMiddleware(CreateUserDtoValidationSchema),
  emailAvailableGuard,
  usersController.create,
);

module.exports = { usersRouter };
