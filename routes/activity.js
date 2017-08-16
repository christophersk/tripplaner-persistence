const express = require('express');
const router = express.Router();
const { Activity } = require('../models')

router.get('/', function (req, res, next) {
  Activity.findAll()
  .then(activities => {
    res.json(activities);
  })
  .catch(next);
})

module.exports = router;
