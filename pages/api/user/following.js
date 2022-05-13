const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method} = req;
  const {username, wallet} = req.body.params;
  console.log('req body', req.body)
  switch (method) {
    case 'GET':
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      res.status(200).json(user)
      break
    case 'PUT':
      const userToFollow = await User.findOne({
        where: {
          username: username
        }
      })
      const me = await User.findOne({
        where: {
          wallet: wallet
        }
      })
      console.log('user', userToFollow.id)
      console.log('me', me.id)
      res.json(await Follows.create({userId: userToFollow.id, followerId: me.id}))
    default:
      res.status(500)
      break
  }
}
