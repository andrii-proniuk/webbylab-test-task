const authConfig = {
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      // eslint-disable-next-line max-len
      '3e50acc78934fa9b7a46363335dec40b69c05e3d1401128ef9a56e52d5388dd4958ee4cae97efc9fa893127f5489c844bea1e75509b1d579310b81d7169ebd34',
    maxAge: process.env.JWT_MAX_AGE || '1d',
  },
};

module.exports = {
  authConfig,
};
