'use strict'

const express = require('express');
const router = new express.Router();
const Leftover = require('../../../db/models/leftover');
const Cuisine = require('../../../db/models/cuisine');
const User = require('../../../db/models/user');

module.exports = router;

router.get('/', function(req, res, next) {
  Cuisine.findAll()
    .then(function(cuisines) {
      res.send(cuisines);
    })
    .catch(next);
})

router.get('/:cuisineName', function(req, res, next) {
  Cuisine.findOne({
      where: {
        name: req.params.cuisineName
      }
    })
    .then(function(cuisine) {
      return cuisine.getLeftovers({
        include: [{
          model: User,
          as: 'chef'
        }]
      });
    })
    .then(function(cuisineLeftovers) {
      res.send(cuisineLeftovers);
    })
    .catch(next);
})

