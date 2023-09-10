const fs = require('fs');
const swaggerSpec = require('./swagger-config');

fs.writeFileSync('./swagger.json', JSON.stringify(swaggerSpec, null, 2));
