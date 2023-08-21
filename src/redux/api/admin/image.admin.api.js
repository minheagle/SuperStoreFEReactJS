import axios from "../axiosInstance.js";

const getPreSignUrl = async () => {
  const response = await axios.get("/get-presigned-url/products");
  console.log(response);
  return response;
};

const uploadImageProduct = async (images) => {
  const preSignUrl = await axios.get("/get-presigned-url/products");
  console.log(preSignUrl);
  const response = await axios.post(preSignUrl.presignedUrl, images, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const apiImageForAdmin = { getPreSignUrl, uploadImageProduct };

export default apiImageForAdmin;
