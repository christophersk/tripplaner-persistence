var Sequelize = require('sequelize');
var db = require('./_db');

let Day = db.define('day', {
  number: {
    type: Sequelize.INTEGER
  }
})

module.exports = Day;
