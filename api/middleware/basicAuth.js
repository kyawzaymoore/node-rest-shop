const basicAuth = require('express-basic-auth');
const { getResponseModel } = require('../helper/responseUtils');
const ErrorCode = require('../helper/errorCodes');

const users = {
    // Format: username: password
    'fido': 'dido',
  };

// Middleware to perform basic authentication
module.exports = basicAuth({
    users: users,
    challenge: true, // Sends a 401 response with WWW-Authenticate header when authentication fails
    unauthorizedResponse: getResponseModel(ErrorCode.E401)
  });