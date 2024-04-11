const { Router } = require('express');
const multer = require('multer');
const { authMiddleware } = require('../middlewares/auth.middleware');
const {
  validateBodyMiddleware,
} = require('../middlewares/validate-body.middleware');
const {
  validateParamIdMiddleware,
} = require('../middlewares/validate-param-id.middleware');
const {
  validateQueryParamsMiddleware,
} = require('../middlewares/validate-query-params.middleware');
const { CreateMovieDtoValidationSchema } = require('../dto/create-movie.dto');
const { GetMoviesDtoValidationSchema } = require('../dto/get-movies.dto');
const {
  movieTitleAvailableGuard,
} = require('../guards/movie-title-available.guard');
const { movieExistsByIdGuard } = require('../guards/movie-exists-by-id.guard');
const { moviesController } = require('../controllers/movies.controller');
const { UpdateMovieDtoValidationSchema } = require('../dto/update-movie.dto');

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fields: 1,
    fieldNameSize: 6,
    files: 1,
    fileSize: 1024 * 1024,
  },
});

const moviesRouter = Router();

moviesRouter.post(
  '/',
  authMiddleware,
  validateBodyMiddleware(CreateMovieDtoValidationSchema),
  movieTitleAvailableGuard,
  moviesController.create,
);

moviesRouter.get(
  '/',
  authMiddleware,
  validateQueryParamsMiddleware(GetMoviesDtoValidationSchema),
  moviesController.search,
);

moviesRouter.get(
  '/:id',
  authMiddleware,
  validateParamIdMiddleware,
  movieExistsByIdGuard,
  moviesController.getById,
);

moviesRouter.patch(
  '/:id',
  authMiddleware,
  validateParamIdMiddleware,
  movieExistsByIdGuard,
  validateBodyMiddleware(UpdateMovieDtoValidationSchema),
  moviesController.update,
);

moviesRouter.delete(
  '/:id',
  authMiddleware,
  validateParamIdMiddleware,
  movieExistsByIdGuard,
  moviesController.deleteById,
);

moviesRouter.post(
  '/import',
  authMiddleware,
  upload.single('movies'),
  moviesController.importFromFile,
);

module.exports = { moviesRouter };
