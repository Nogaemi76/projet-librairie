const express = require('express');
const app = express();
const productRoute = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/Product');

//fix deprecations
mongoose.set('useFindAndModify', false);

productRoute.route('/addproduct').post((req, res, next) => {
    Product.create(req.body, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

productRoute.route('/').get((req, res, next) => {
    Product.find((error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

productRoute.route('/getaproduct/:id').get((req, res, next) => {
    Product.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
            // console.log('works fine');
        }
    })
});

productRoute.route('/updateproduct/:id').put((req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set:req.body
    }, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.json(data);
            console.log('Product successfully updated');
        }
    })
});

productRoute.route('/deleteproduct/:id').delete((req, res, next) => {
    Product.findByIdAndRemove(req.params.id, (error, data) => {
        if(error) {
            return next(error);
        } else {
            res.status(200).json({msg:data});
            console.log("Product successfully deleted");
        }
    })
});

module.exports = productRoute;