const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method, body: {username, wallet}} = req;
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
      const userToFollow = User.findOne({
        where: {
          username: username
        }
      })
      const me = User.findOne({
        where: {
          wallet: wallet
        }
      })
      res.json(await Follows.create({userId: userToFollow.id, followerId: me.id}))
    default:
      res.sendStatus(500)
      break
  }
}
