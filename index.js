const logger = require('./utilities/logger');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const express = require('express');

const app = express();
const PORT = 12016;

app.use(express.json());

// logging
app.use(require('morgan')(
    ':method :url = :status',
    { stream: { write: message => logger.info(message.trim(), { source: 'morgan' }) } }
));

// Swagger
const swaggerSpecs = swaggerJsdoc(require('./docs/swaggerSpecs'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Actual application routes
app.get('/', (request, response) => response.send('Hello, Advent of Code!'));

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
