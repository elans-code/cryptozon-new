const Sequelize = require('sequelize');
const db = require('../db');

const Follows = db.define('follow', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Follows
