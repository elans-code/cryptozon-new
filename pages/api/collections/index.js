const { Collections } = require("../../../db");

const wrapAsync = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    throw err;
  });

const createCollection = wrapAsync(async (req, res) => {
  const { name, profileImg, bannerImg, description = "" } = req.body;
  const newCollection = await Collections.create({
    name,
    profileImg,
    bannerImg,
    ...(!!description && description),
  });
  res.status(201).json({ status: "success", data: newCollection });
});

const getAllCollections = wrapAsync(async (req, res) => {});

export default async function handler(req, res) {
  try {
  } catch (err) {}
}
