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
    .catch(next)
})

router.put('/:id', function (req, res, next) {
  Day.findOne({where: {number: req.params.id}})
  .then(day => {
    return [day, Hotel.findById(req.body.hotelId)]
    //return day.update(req.body)
  })
  .spread((day, hotel) => {
    return day.setHotels([hotel]);
  })
  .then(day => {
    return res.json(day);
  })
  .catch(next);
})
module.exports = router;
