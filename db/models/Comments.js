const Sequelize = require('sequelize');
const db = require('../db');

const Comments = db.define('comments', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likes: {
    type: Sequelize.INTEGER
  },
})

module.exports = Comments;
