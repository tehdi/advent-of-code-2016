const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');

const app = express();
const PORT = 12016;

app.use(express.json());

// logging
// app.use(require('morgan')(
//     ':method :url = :status',
//     { stream: { write: message => logger.debug(message.trim(), { source: 'morgan' }) } }
// ));

// Swagger
const swaggerSpecs = swaggerJsdoc(require('./docs/swaggerSpecs'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Pre-processors
app.use(require('./argsProcessor'));

// Actual application routes
app.get('/', (request, response) => response.send('Hello, Advent of Code! https://adventofcode.com/2016'));
app.use('/day01', require('./days/day01/route'));
app.use('/day02', require('./days/day02/route'));
app.use('/day03', require('./days/day03/route'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
