function loggerMiddleware(req, res, next) {
    console.log(`Received ${req.method} request at ${req.url}`);
    next();
  }

  module.exports = loggerMiddleware;
  