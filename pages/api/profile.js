import User from "../../db/models/User";

export default async function handler(req, res) {
  const { method } = req;
  let { wallet } = req.query;
  switch (method) {
    case "GET":
      const user = await User.findOne({
        where: {
          wallet: wallet,
        },
      });
      return res.status(200).send(user);

    case "PUT":
      const updateUser = await User.findOne({
        where: {
          wallet: wallet,
        },
      });
      await updateUser.update(req.body);
      return res.status(200).send(updateUser);

    default:
      break;
  }
}
