const mongoose = require('mongoose');

const { getResponseModel } = require('../helper/responseUtils');
const ErrorCode = require('../helper/errorCodes'); 
const httpStatus = require('../helper/httpStatus');

const Order = require('../models/order');
const Product = require('../models/product');

exports.orders_get_all = (req, res, next) => {
    Order.find().select('_id quantity')
        .populate('productId', 'name price')
        .exec().then(docs => {
            if (docs.length > 0) {
                const data = docs.map(doc => {
                    return {
                        quantity: doc.quantity,
                        product: doc.productId,
                        _id: doc._id,
                        request: {
                            type: 'GET',
                            url: 'http://localhost:3000/orders/' + doc._id
                        }
                    }

                })
                const response = getResponseModel(ErrorCode.E0, data);
                return res.status(httpStatus.OK).json(response);
            }
            else {
                const response = getResponseModel(ErrorCode.E0, null);
                return res.status(httpStatus.OK).json(response);
            }
        }).catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500, err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        });
}

exports.orders_create = (req, res, next) => {
    Product.findById(req.body.productId)
        .then(product => {
            if (!product) {
                const response = getResponseModel(ErrorCode.E402);
                return res.status(httpStatus.OK).json(response);
            }

            const order = new Order({
                _id: new mongoose.Types.ObjectId(),
                quantity: req.body.quantity,
                productId: req.body.productId
            });

            return order.save().then(result => {
                const response = getResponseModel(ErrorCode.E0, result);
                return res.status(httpStatus.OK).json(response);
            })
                .catch(err => {
                    console.log(err);
                    const response = getResponseModel(ErrorCode.E005, err);
                    return res.status(httpStatus.OK).json(response);
                });
        })
        .catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E005, err);
            return res.status(httpStatus.OK).json(response);
        });
};

exports.orders_get_by_id = (req, res, next) => {
    const id = req.params.orderId;
    Order.findById(id).select('_id quantity')
        .populate('productId', 'name price')
        .exec().then(doc => {
            if (doc) {
                data = {
                    quantity: doc.quantity,
                    product: doc.productId,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/orders/' + doc._id
                    }
                }
                const response = getResponseModel(ErrorCode.E0, data);
                return res.status(httpStatus.OK).json(response);
            }
            else {
                const response = getResponseModel(ErrorCode.E404);
                return res.status(httpStatus.OK).json(response);
            }
        }).catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        });
};

exports.orders_update = (req,res,next) => {
    const id = req.params.orderId;
    return res.status(200).json({
        message: 'PATCH Order by ID : ' + id
    });
};

exports.orders_delete = (req,res,next) => {
    const id = req.params.orderId;
    return res.status(200).json({
        message: 'DELETE Order by ID : ' + id
    });
};