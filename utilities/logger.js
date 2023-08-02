const winston = require('winston');

const consoleTransport = new winston.transports.Console({ level: 'debug' });

const logger = winston.createLogger({
    transports: [ consoleTransport ],
    exitOnError: false,
    colorize: false,
    format: winston.format.json() // is default, but I'm putting it here to remind me
});


module.exports = logger;

/*
Log levels. Lower number = more important.
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6
*/
