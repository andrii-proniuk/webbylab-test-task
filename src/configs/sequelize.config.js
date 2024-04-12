const path = require('path');

const storage = process.env.DB_PATH
  ? path.join(process.cwd(), process.env.DB_PATH)
  : path.join(process.cwd(), 'db', 'main.sqlite');

/**
 * @type {import('sequelize').Options}
 * */
const sequelizeConfig = {
  dialect: 'sqlite',
  storage,
  // logging: false,
};

module.exports = { sequelizeConfig };
