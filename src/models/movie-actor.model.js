const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

class MovieActor extends Model {}

MovieActor.init(
  {
    actorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    movieId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  { sequelize },
);

module.exports = { MovieActor };
