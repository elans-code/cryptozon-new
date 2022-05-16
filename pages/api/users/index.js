const { User } = require("../../../db");

export default async function handler(req, res) {
  const { method } = req;
  switch (method) {
    case "GET":
      const users = await User.findAll({
        attributes: ["username"],
      });
      return res.status(200).json(users);

    default:
      return res.status(500).json({ message: "Someting went wrong" });
  }
}
