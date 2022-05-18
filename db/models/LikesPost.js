const Sequelize = require('sequelize');
const db = require('../db');

const LikePost = db.define('likes_post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  }
})

module.exports = LikePost
