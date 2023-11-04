const winston = require('winston');

const consoleTransport = new winston.transports.Console({ level: 'debug' });

const winstonLogger = winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [consoleTransport],
  exitOnError: false
});

const isTruthy = (str) => str.toLowerCase() === 'true' || str === '1';

const logger = {
  verbose: 'false',

  debug: function (message) {
    if (isTruthy(this.verbose)) {
      winstonLogger.debug(message);
    }
  },

  info: function (message) {
    winstonLogger.info(message);
  }
}

module.exports = logger;
