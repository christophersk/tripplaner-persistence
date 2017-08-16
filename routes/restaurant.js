const express = require('express');
const router = express.Router();
const { Restaurant } = require('../models')

router.get('/', function (req, res, next) {
  Restaurant.findAll()
  .then(restaurants => {
    res.json(restaurants);
  })
  .catch(next);
})

module.exports = router;
