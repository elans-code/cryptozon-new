const {User} = require('../../../db')

export default async function handler(req, res) {
  const {method, query: {username}} = req
  switch (method) {
    case 'GET':
      const user = await User.findOne({
        where: {
          username: username
        }
      });
      res.status(200).json(user)
      break
    default:
      res.sendStatus(500)
      break
  }
}
