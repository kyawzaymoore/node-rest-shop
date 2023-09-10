const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger.json'); // Import the generated Swagger JSON


const nodeEnv = process.env.NODE_ENV || 'development';

// Load environment variables based on the runtime environment
if (nodeEnv === 'production') {
  require('dotenv').config({ path: '.env.production' });
} else {
  require('dotenv').config({ path: '.env.development' });
}
const dbUrl = process.env.DB_URL;


// Serve Swagger UI at a specific route (e.g., /api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


const loggerMiddleware = require('./api/middleware/loggerMiddleware');

const productRoutes = require('./api/routes/productRoutes');
const orductRoutes = require('./api/routes/orderRoutes');
const userRoutes = require('./api/routes/userRoutes');

mongoose.connect(dbUrl, 
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 
    'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
})


const basicAuth = require('./api/middleware/basicAuth');
const bearerAuth = require('./api/middleware/bearerAuth');

app.use(loggerMiddleware);
app.use('/products', basicAuth, productRoutes);
app.use('/orders', bearerAuth, orductRoutes);
app.use('/user', basicAuth, userRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 400;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;