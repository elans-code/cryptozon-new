export default async function handler(req, res) {
  try {
    switch (req.method) {
      case "POST":
      //something
    }
  } catch (err) {
    res.status(400).json({ status: error, message: err.message });
  }
}
