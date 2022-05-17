const Sequelize = require('sequelize');
const db = require('../db');

const Like = db.define('likes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = Like
