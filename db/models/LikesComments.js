const Sequelize = require('sequelize');
const db = require('../db');

const LikeComments = db.define('likes_comments', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = LikeComments
