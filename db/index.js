const db = require('./db')
const User = require('./models/User')
const Post = require('./models/Post')
const Comments = require('./models/Comments')
const Follows = require('./models/Follows')

User.hasMany(Post);
Post.belongsTo(User);
Comments.belongsTo(Post);
Post.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(User)

User.belongsToMany(User, {through: Follows, as: 'following'})

module.exports = {
  db,
  User,
  Post,
  Comments,
  Follows
}
