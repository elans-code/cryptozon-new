const db = require("./db");
const User = require("./models/User");
const Post = require("./models/Post");
const Comments = require("./models/Comments");
const Collections = require("./models/Collections");

User.hasMany(Collections);
Collections.belongsTo(User);

User.hasMany(Post);
Post.belongsTo(User);
Comments.belongsTo(Post);
Post.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(User);

module.exports = {
  db,
  User,
  Post,
  Comments,
  Collections,
};
