/**
 * @type {import('../types/globals').ExceptionHandler}
 */
// eslint-disable-next-line max-params
const exceptionHandler = (err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.log(err);

  res.status(500).send({ message: 'Internal server error' });
};

module.exports = { exceptionHandler };
