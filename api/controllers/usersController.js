const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const httpStatus = require('../helper/httpStatus')
const jwt = require('jsonwebtoken');

const { getResponseModel } = require('../helper/responseUtils');
const ErrorCode = require('../helper/errorCodes');

const User = require('../models/user');

exports.user_signup = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            console.log("user lenght " + user.lenght);
            if (user.length >= 1) {
                const response = getResponseModel(ErrorCode.E101);
                return res.status(httpStatus.OK).json(response);
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        console.log(err);
                        const response = getResponseModel(ErrorCode.E500, data);
                        return res.status(httpStatus.OK).json(response);
                    }
                    else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(result => {
                                console.log(result);
                                const response = getResponseModel(ErrorCode.E0);
                                return res.status(httpStatus.OK).json(response);
                            })
                            .catch(err => {
                                console.log(err);
                                const response = getResponseModel(ErrorCode.E500, data);
                                return res.status(httpStatus.OK).json(response);
                            });
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500, err);
            return res.status(httpStatus.OK).json(response);
        });
};

exports.user_login = (req, res, next) => {
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1) {
            const response = getResponseModel(ErrorCode.E102);
            return res.status(httpStatus.OK).json(response);
        }
        
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if(err) {
                const response = getResponseModel(ErrorCode.E102);
                return res.status(httpStatus.OK).json(response);
            }
            console.log("login result: " + result);
            if(result) {
                const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                data = {token: token};
                const response = getResponseModel(ErrorCode.E0, data);
                return res.status(httpStatus.OK).json(response);
            }
            else{
                const response = getResponseModel(ErrorCode.E102);
                return res.status(httpStatus.OK).json(response);
            }
        })
    })
    .catch(err => {
        console.log(err);
        const response = getResponseModel(ErrorCode.E500, err);
        return res.status(httpStatus.OK).json(response);
    });
};