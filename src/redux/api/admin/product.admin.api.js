import axios from "../axiosInstance";

const create = async (createProductForm) => {
  const response = await axios.post("/products/create", createProductForm, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response;
};

const apiProductForAdmin = { create };

export default apiProductForAdmin;
