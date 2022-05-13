const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method} = req;
  const {id} = req.query;

  switch (method) {
    case 'GET':
      const follows = await Follows.findAll({
        where: {
          followerId: id
        }
      })
      const following = await Promise.all(follows.map(async (f) => {
        let person = await User.findOne({
          where: {
            id: f.userId
          },
          attributes: ["username", "imageUrl"]
        })
        return person
      }))
      res.status(200).json(following)
      break
    default:
      res.status(500)
      break
  }
}
