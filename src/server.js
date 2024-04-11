const express = require('express');
const cors = require('cors');
const { generalConfig } = require('./configs/general.config');
const { usersRouter } = require('./routers/users.router');
const { sessionsRouter } = require('./routers/sessions.router');
const { moviesRouter } = require('./routers/movies.router');
const {
  httpExceptionHandler,
} = require('./exception-handlers/http-exception.handler');
const { exceptionHandler } = require('./exception-handlers/exception.handler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/users', usersRouter);
app.use('/sessions', sessionsRouter);
app.use('/movies', moviesRouter);

app.use(httpExceptionHandler);
app.use(exceptionHandler);

const startServer = () => {
  app.listen(generalConfig.port, () => {
    // eslint-disable-next-line no-console
    console.log('Server successfully started on port', generalConfig.port);
  });
};

module.exports = { startServer };
