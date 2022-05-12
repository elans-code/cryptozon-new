const {User, Follows} = require('../../../db')

export default async function handler(req, res) {
  const {method, body: {username}} = req;
  switch (method) {
    case 'GET':
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      const followers = Follows.findAll({
        where: {
          userId: user.id
        },
        include: {
          model: User
        }
      })
      res.status(200).json(followers)
      break
    default:
      res.sendStatus(500)
      break
  }
}

