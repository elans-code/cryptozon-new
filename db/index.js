const db = require('./db')
const User = require('./models/User')
const Post = require('./models/Post')
const Comments = require('./models/Comments')

User.hasMany(Post);
Post.belongsTo(User);
Comments.belongsTo(Post);
Post.hasMany(Comments);
User.hasMany(Comments);
Comments.belongsTo(User)

// followers through table?
User.belongsToMany(User, {through: 'follows', as: 'following'})

module.exports = {
  db,
  User,
  Post,
  Comments,
}
