const jwt = require('jsonwebtoken')
const httpStatus = require('../helper/httpStatus')
const { getResponseModel } = require('../helper/responseUtils');
const ErrorCode = require('../helper/errorCodes');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        const response = getResponseModel(ErrorCode.E401);
        return res.status(httpStatus.UNAUTHORIZED).json(response);
    }
}