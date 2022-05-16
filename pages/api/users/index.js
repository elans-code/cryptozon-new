const {User} = require('../../../db')

export default async function handler(req, res) {
  const {method} = req
  switch (method) {
    case 'GET':
      const users = await User.findAll({
        attributes: ['username']
      });
      res.status(200).json(users)
      break
    default:
      res.sendStatus(500)
      break
  }
}
