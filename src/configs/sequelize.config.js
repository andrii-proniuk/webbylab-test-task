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
  // eslint-disable-next-line no-console
  logging: process.env.NODE_ENV === 'production' ? false : console.log,
};

module.exports = { sequelizeConfig };
