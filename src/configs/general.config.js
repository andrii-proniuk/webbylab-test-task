const generalConfig = {
  port: (process.env.APP_PORT && parseInt(process.env.APP_PORT, 10)) || 8000,
};

module.exports = {
  generalConfig,
};
