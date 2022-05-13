import { wrapAsync } from "../../../utils";
import { Collections, User } from "../../../db";

const createCollection = wrapAsync(async (req, res) => {
  const { name, profileImg, bannerImg, description = "", address } = req.body;
  // address
  const newCollection = await Collections.create({
    name,
    profileImg,
    bannerImg,
    ...(!!description && description),
  });
  res.status(201).json({ status: "success", data: newCollection });
});

const getAllCollections = wrapAsync(async (req, res) => {
  const collections = await Collections.findAll();
  res.status(200).json({ status: "success", data: collections });
});

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "GET":
        getAllCollections(req, res);
      case "POST":
        createCollection(req, res);
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.message });
  }
}
