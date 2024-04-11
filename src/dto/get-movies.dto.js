const { z } = require('zod');
const {
  SEQUELIZE_AVAILABLE_ORDERS,
  SEQUELIZE_ORDERS,
  SEQUELIZE_LIMIT_MIN,
  SEQUELIZE_LIMIT_MAX,
  SEQUELIZE_OFFSET_MIN,
  SEQUELIZE_OFFSET_DEFAULT,
  SEQUELIZE_LIMIT_DEFAULT,
} = require('../constants/general.constants');
const {
  MOVIES_ORDER_AVAILABLE_PROPERTIES,
  MOVIES_ORDER_PROPERTY_DEFAULT,
  MOVIES_TITLE_MIN_LENGTH,
  MOVIES_SEARCH_MIN_LENGTH,
  MOVIES_ACTOR_MIN_LENGTH,
} = require('../constants/movies.constants');

const GetMoviesDtoValidationSchema = z.object({
  title: z.string().min(MOVIES_TITLE_MIN_LENGTH).trim().optional(),
  actor: z.string().min(MOVIES_ACTOR_MIN_LENGTH).trim().optional(),
  search: z.string().min(MOVIES_SEARCH_MIN_LENGTH).trim().optional(),
  sort: z
    .enum(MOVIES_ORDER_AVAILABLE_PROPERTIES)
    .default(MOVIES_ORDER_PROPERTY_DEFAULT),
  order: z.enum(SEQUELIZE_AVAILABLE_ORDERS).default(SEQUELIZE_ORDERS.ASC),
  limit: z.coerce
    .number()
    .int()
    .min(SEQUELIZE_LIMIT_MIN)
    .max(SEQUELIZE_LIMIT_MAX)
    .default(SEQUELIZE_LIMIT_DEFAULT),
  offset: z.coerce
    .number()
    .int()
    .min(SEQUELIZE_OFFSET_MIN)
    .default(SEQUELIZE_OFFSET_DEFAULT),
});

/**
 * @typedef {import('zod').infer<GetMoviesDtoValidationSchema>} GetMoviesDto
 */

module.exports = { GetMoviesDtoValidationSchema };
