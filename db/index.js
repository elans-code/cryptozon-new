const db = require("./db");
const User = require("./models/User");
const Post = require("./models/Post");
const Comments = require("./models/Comments");
const Collections = require("./models/Collections");
const NFTs = require("./models/NFTs");
const Follows = require("./models/Follows");

User.hasMany(Collections);
Collections.belongsTo(User);

Collections.hasMany(NFTs, { onDelete: "cascade" });
NFTs.belongsTo(Collections);

User.hasMany(Post);
Post.belongsTo(User);
Comments.belongsTo(Post);
Post.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(User);

User.belongsToMany(User, { through: Follows, as: "following" });

module.exports = {
  db,
  User,
  Post,
  Comments,
  Collections,
  Follows,
};
