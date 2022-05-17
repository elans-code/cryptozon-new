import axios from "axios";
export const wrapAsync = (fn) => (req, res) =>
  fn(req, res).catch((err) => {
    throw err;
  });

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "cryptozon");
    const { data } = await axios.post(
      "https://api.cloudinary.com/v1_1/dpkj75tyu/image/upload",
      formData
    );
    return data.secure_url;
  } catch (err) {
    console.log(err);
    throw new Error("Something went wrong uploading.");
  }
};
