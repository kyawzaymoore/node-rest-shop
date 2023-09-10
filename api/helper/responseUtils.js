// response-utils.js

const fs = require('fs');
const path = require('path');
// const ErrorCode = require('./errorCodes'); // Adjust the path as needed

// Define the type for error code messages
const absolutePath = path.join(__dirname, 'errorcode.json');
const errorCodesJSON = fs.readFileSync(absolutePath, 'utf-8');
const errorCodeList = JSON.parse(errorCodesJSON);

// Define the response model type
module.exports.ResponseModel = class ResponseModel {
    constructor(code, message, data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
};

// Create a function to generate response models
module.exports.getResponseModel = function (errCode, data) {
    const error = errorCodeList[errCode];
    if (error) {
        return new module.exports.ResponseModel(error.code, error.message, data);
    } else {
        return new module.exports.ResponseModel(-1, 'Unknown Error', data);
    }
};
