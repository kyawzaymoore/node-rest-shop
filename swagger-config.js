const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'Node Rest Shop API',
      version: '1.0.0',
      description: 'Nodejs API',
    },
  },
  // Define the path(s) to your API route files
  apis: ['./api/routes/*.js'], // Use wildcards to match route files
};

const specs = swaggerJsdoc(options);

module.exports = specs;
