import { useState, useCallback } from "react";
import axios from "axios";
export default function useCloudinary() {
  const [data, setData] = useState({ data: null, status: "idle", error: null });
  const uploadImage = useCallback(async (file) => {
    setData((prev) => ({ ...prev, status: "loading" }));
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "cryptozon");
      const { data } = await axios.post(
        "https://api.cloudinary.com/v1_1/dpkj75tyu/image/upload",
        formData
      );

      setData({ data: data.secure_url, status: "success", error: null });
    } catch (err) {
      setData({ data: null, status: "error", error: err.message });
    }
  }, []);

  return { data, uploadImage };
}
