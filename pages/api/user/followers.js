const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  // const {method, query: {id}} = req;
  const {method} = req;
  const id = !!req.query.id ? req.query.id : null;
  const wallet = !!req.body.params ? req.body.params.wallet : null
  const username = !!req.body.params ? req.body.params.username : null
  switch (method) {
    case 'GET':
      try {
      const follows = await Follows.findAll({
        where: {
          userId: id
        },
      })
      const followers = await Promise.all(follows.map(async (f) => {
        let person = await User.findOne({
          where: {
            id: f.followerId
          },
          attributes: ["username", "imageUrl"]
        })
        return person
      }))
      res.json(followers)
      break
    } catch (err) {
      res.status(400).json(err.message)
    }
    case 'PUT':
      // follow
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
      // update following and followers for both users
      await userToFollow.update({...userToFollow, followers: userToFollow.followers + 1})
      await me.update({...me, following: me.following + 1})
      res.json(await Follows.create({userId: userToFollow.id, followerId: me.id}))
    default:
      res.status(500)
      break
  }
}

