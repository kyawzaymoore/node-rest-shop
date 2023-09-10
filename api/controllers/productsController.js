const mongoose = require('mongoose');

const { getResponseModel } = require('../helper/responseUtils');
const ErrorCode = require('../helper/errorCodes'); 
const httpStatus = require('../helper/httpStatus');

const Product = require('../models/product');

exports.products_get_all = (req, res, next) => {
    Product.find().select('_id name price').exec().then(docs => {
        console.log(docs);
        if (docs.length > 0) {
            data = docs.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/products/' + doc._id
                    }
                }
            }) ;
            const response = getResponseModel(ErrorCode.E0, data);
            return res.status(httpStatus.OK).json(response);
        }
        else {
            const response = getResponseModel(ErrorCode.E0,null);
            return res.status(httpStatus.OK).json(response);
        }
    }).catch(err => {
        console.log(err);
        const response = getResponseModel(ErrorCode.E500,err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    });
};

exports.products_create = (req, res, next) => {

    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });

    product.save().then(result => {
        console.log(result);
        const response = getResponseModel(ErrorCode.E0, product);
        return res.status(httpStatus.OK).json(response);
    })
        .catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500, err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        });
};

exports.products_get_by_id = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select('_id name price').exec().then(doc => {
        if (doc) {
            const response = getResponseModel(ErrorCode.E0, doc);
            return res.status(httpStatus.OK).json(response);
        }
        else {
            const response = getResponseModel(ErrorCode.E404);
            return res.status(httpStatus.OK).json(response);
        }
    }).catch(err => {
        console.log(err);
        const response = getResponseModel(ErrorCode.E500, err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
    });
};

exports.products_update = (req, res, next) => {
    const id = req.params.productId;

    const updateOps = req.body;

    Product.updateOne({_id:id}, {
        $set: updateOps
    })
    .exec()
    .then(result => {
        const response = getResponseModel(ErrorCode.E0);
        return res.status(httpStatus.OK).json(response);
    })
        .catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500, err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.findByIdAndRemove({_id:id})
    .exec()
    .then(result => {
        const response = getResponseModel(ErrorCode.E0);
        return res.status(httpStatus.OK).json(response);
    })
        .catch(err => {
            console.log(err);
            const response = getResponseModel(ErrorCode.E500, err);
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(response);
        });
};