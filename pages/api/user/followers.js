const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {username}} = req;
  switch (method) {
    case 'GET':
      try {
      const user = await User.findOne({
        where: {
          username: username
        }
      });
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
      res.status(400).json(err)
    }
    default:
      res.sendStatus(500)
      break
  }
}

