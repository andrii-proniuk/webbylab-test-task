const { DataTypes, Model } = require('sequelize');
const { sequelize } = require('../sequelize');

/**
 * @typedef {Object} ActorAttributes
 * @property {number} id
 * @property {string} name
 */

/**
 * @typedef {Model<ActorAttributes, Pick<ActorAttributes, 'name'>>} ActorModel
 */

class Actor extends Model {}

Actor.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  { sequelize },
);

module.exports = { Actor };
