import User from "../../db/models/User"

export default async function handler(req, res) {
  const {method} = req;
  let {wallet} = req.query
  switch (method) {
    case 'GET':
      const user = await User.findOne({
        where: {
          wallet: wallet
        }
      })
      res.status(200).send(user)
      break
    case 'PUT':
      const updateUser = await User.findOne({
        where: {
          wallet: wallet
        }
      })
      await updateUser.update(req.body)
      res.status(200).send(updateUser)
      break
    default:
      break
  }
}
