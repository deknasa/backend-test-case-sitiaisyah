const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BackendTestCase',
      version: '1.0.0',
      description: 'API documentation using swagger for BackendTestCase',
    },
  },
  apis: ['./routes/*.js'], // Path to the API routes
};
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;