const express = require('express');
const router = express.Router();
const { Day, Hotel, Restaurant, Activity } = require('../models');

router.get('/', function (req, res, next) {
  Day.findAll({
    include: [Hotel, Restaurant, Activity]
  })
  .then(days => {
    res.json(days);
  })
  .catch(next);
})

router.post('/', function (req, res, next) {
  Day.create(req.body)
  .then(day => {
    res.json(day);
  })
})
module.exports = router;
