const express = require('express');
const router = express.Router();
const { Hotel } = require('../models')

router.get('/', function (req, res, next) {
  Hotel.findAll()
  .then(hotels => {
    res.json(hotels);
  })
  .catch(next);
})

module.exports = router;
