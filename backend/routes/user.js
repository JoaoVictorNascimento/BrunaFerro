const express = require('express');
const User = require('../models/user')
const router = express.Router();
const Joi = require('joi')
const validator = require('express-joi-validation')({})

Joi.objectId = require('joi-objectid')(Joi);
const bodyValidator = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().max(20),
    phone: Joi.string().min(11).max(11),
    obs: Joi.string().max(1000),
})

const paramsValidator = Joi.object({
    id: Joi.objectId().required()
})

router.get('/', function (req, res) {
    res.send('teste, Estou aqui')
})

router.get('/user/:id', validator.params(paramsValidator), function (req, res) {
    User.getUserbyid(req.params.id, req.user._id, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(400).send('server cound not understand the request')
        }
        res.status(200).json(user)
    })
})

router.post('/registerUser', validator.body(bodyValidator), (req, res) => {
    let newUser = {}
    newUser.email = req.body.email
    newUser.name = req.body.name
    newUser.phone = req.body.phone
    newUser.obs = req.body.obs

    User.addUser(newUser, (err, user) => {
        if (err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(201).json(user)
        console.log('User Register')
    })
})

router.delete('/user/:id', validator.params(paramsValidator), function (req, res) {
    User.deleteUser(req.params.id, function (err, user) {
        if (err) {
            console.log(err)
            return res.status(400).send('server could not understand the request')
        }
        res.status(203).send(user)
    })
})

router.get('/users', (req, res) => {
    User.getUsers(function (err, users){
      if(err){
        console.log(err)
        return res.status(400).send('server could not understand the request')
      }
      else{
        res.status(200).send(users);
      }
    })
  })

module.exports = router