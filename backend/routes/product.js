const express = require('express');
const Product = require('../models/product')
const mongoose = require("mongoose");
const router = express.Router();
const Joi = require('joi')
const multer = require('multer');
const validator = require('express-joi-validation')({})

Joi.objectId = require('joi-objectid')(Joi);

const bodyValidator = Joi.object({
    category: Joi.string().required(),
    measure: Joi.string().max(20),
    price: Joi.number(),
    description: Joi.string().max(1000),
})

const paramsValidator = Joi.object({
    id: Joi.objectId().required()
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './images/');
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const images = multer({
    storage: storage,
    fileFilter: fileFilter
  });

router.post('/registerProduct',images.single('productImage'), validator.body(bodyValidator), (req, res) => {
    console.log(req.file)
    let newProduct = {}
    newProduct._id = new mongoose.Types.ObjectId()
    newProduct.category = req.body.category
    newProduct.measure = req.body.measure
    newProduct.price = req.body.price
    newProduct.description = req.body.description
    newProduct.productImage = req.file.path

    Product.addProduct(newProduct, function (err, product) {
        if(err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(200).json(product)
    })
})

router.get('/products', (req, res) => {
    Product.getProducts(function (err, products){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        else{
            res.status(200).send(products)
        }
    })
})

router.get('/product/:id',validator.params(paramsValidator), function (req, res) {
    Product.getProductById(req.params.id, function(err, product){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(200).json(product)
    })
})

router.get('/productsByCategory/:category', (req, res) => {
    Product.getProductByCategory(req.params.category, function (err, products){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(200).json(products)
    })
})

router.delete('/deleteProduct/:id', validator.params(paramsValidator), function(req, res) {
    Product.deleteProduct(req.params.id, function(err, product){
        if(err){
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(203).send()
    })
})

router.put('/product/:id', images.single('productImage'), validator.params(paramsValidator), function(req, res){
    let updateProduct = {}
    updateProduct._id = req.params.id
    updateProduct.category = req.body.category
    updateProduct.measure = req.body.measure
    updateProduct.price = req.body.price
    updateProduct.description = req.body.description
    updateProduct.productImage = req.file.path

    Product.updateProduct(updateProduct, function(err, product) {
        if(err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(200).json(product)
    })
})

module.exports = router