'use strict'

const express = require('express');
const router = new express.Router();
const Leftover = require('../../../db/models/leftover');
const Cuisine = require('../../../db/models/cuisine');

module.exports = router;

router.get('/', function(req, res, next){
	Cuisine.findAll()
	.then(function(cuisines){
		res.send(cuisines);
	})
	.catch(next);
})

router.get('/:cuisine', function(req, res, next){
	Cuisine.findOne({
		where: {cuisine: req.params.cuisine}
	})
	.then(function(cuisine){
		return cuisine.getLeftovers();
	})
	.then(function(cuisineLeftovers){
		res.send(cuisineLeftovers);
	})
	.catch(next);
})
