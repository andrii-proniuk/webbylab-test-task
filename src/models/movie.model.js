const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');
const { Actor } = require('./actor.model');
const { MovieActor } = require('./movie-actor.model');

/**
 * @typedef {Object} MovieAttributes
 * @property {number} id
 * @property {string} title
 * @property {string} titleOrder
 * @property {number} year
 * @property {string} format
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes>} MovieModel
 */

/**
 * @typedef {import('sequelize').Model<MovieAttributes, Omit<MovieAttributes, 'id'>>} MovieModel
 */

/**
 * @extends {Model<MovieAttributes, Omit<MovieAttributes, 'id'>>}
 */
class Movie extends Model {}

Movie.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    titleOrder: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    year: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    format: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    indexes: [
      {
        fields: ['titleOrder'],
        name: 'ix_movies_titleOrder',
      },
      {
        fields: ['year'],
        name: 'ix_movies_year',
      },
    ],
    scopes: {
      public: {
        attributes: { exclude: ['titleOrder'] },
      },
    },
  },
);

Movie.Actor = Movie.belongsToMany(Actor, {
  through: MovieActor,
  as: 'actors',
  foreignKey: 'movieId',
});
Actor.Movie = Actor.belongsToMany(Movie, {
  through: MovieActor,
  as: 'movies',
  foreignKey: 'actorId',
});

Actor.MovieActor = Actor.hasMany(MovieActor, {
  foreignKey: 'actorId',
  as: 'movieActors',
});

module.exports = { Movie };
