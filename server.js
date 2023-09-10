const http = require('http');
const app = require('./app');


const port = process.env.PORT || 3000;
const nodeEnv = process.env.NODE_ENV || 'development';
const dbUrl = process.env.DB_URL;

const server = http.createServer(app);

//server.listen(port);

server.listen(port, () => {
    console.log(`Server is running in ${nodeEnv} mode on port ${port}`);
    console.log(`Database URL: ${dbUrl}`);
  });