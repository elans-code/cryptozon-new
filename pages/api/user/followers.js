import { user } from 'pg/lib/defaults';

const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  // const {method, query: {id}} = req;
  const {method} = req;
  // const id = !!req.query.id ? req.query.id : null;
  // const wallet = !!req.body.params ? req.body.params.wallet : null
  // const username = !!req.body.params ? req.body.params.username : null
  const username = !!req.query ? req.query.username : null
  switch (method) {
    case 'GET':
      try {
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      const follows = await Follows.findAll({
        where: {
          userId: user.id
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
    default:
      res.status(500)
      break
  }
}

