const Sequelize = require('sequelize');
const db = require('../db');

const Post = db.define('post', {
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  likesCount: {
    type: Sequelize.INTEGER,
    defaultValue:0
  },
  postImage: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  imageUrl:{
    type: Sequelize.TEXT,
    defaultValue: '/assets/question.png'
  }
})

module.exports = Post;
