import { User, Collections } from "../../db/";

export default async function handler(req, res) {
  const { method } = req;
  let { wallet } = req.query;
  switch (method) {
    case "GET":
      if (wallet.length !== 42 || !wallet.startsWith('0x'))
        throw new Error('Invalid wallet address')
      // const user = await User.findOne({
      //   where: {
      //     wallet: wallet,
      //   },
      //   include: [{ model: Collections }],
      // });
      const [user] = await User.findOrCreate({
        where: {
          wallet: wallet
        },
        defaults: {
          wallet: wallet
        },
        include: [{model: Collections}]
      })
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
