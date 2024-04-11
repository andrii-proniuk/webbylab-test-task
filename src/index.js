if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const { startServer } = require('./server');
const { sequelize } = require('./sequelize');

(async () => {
  await sequelize.sync();

  startServer();
})();
