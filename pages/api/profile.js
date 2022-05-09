import User from "../../db/models/User"

export default async function handler(req, res) {
  const {method} = req;
  const {wallet} = req.query;
  switch (method) {
    case 'GET':
      const user = await User.findOne({
        where: {
          wallet: wallet
        }
      })
      res.status(200).send(user)
    default:
      break
  }
}
