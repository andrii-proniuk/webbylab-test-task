const { Sequelize } = require('sequelize');
const { sequelizeConfig } = require('../configs/sequelize.config');

const sequelize = new Sequelize(sequelizeConfig);

module.exports = { sequelize };
