const logger = require('./utilities/logger');

const processArgs = (request, response, next) => {
    logger.verbose = request.query.verbose ?? 'false';
    next();
}

module.exports = processArgs;
