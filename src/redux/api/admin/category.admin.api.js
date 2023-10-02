import axios from "../axiosInstance";

const getAllCategory = async () => {
  try {
    const response = await axios.get("/admin/categories", {
      withCredentials: true,
      method: "get",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailCategory = async (categoryId) => {
  try {
    const response = await axios.get(`/admin/categories/${categoryId}`, {
      withCredentials: true,
      method: "get",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createCategory = async (createCategory) => {
  try {
    const response = await axios.post(
      "/admin/categories/create",
      createCategory,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 30 * 1000,
      }
    );
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoryNoChangeImage = async (updateCategory, categoryId) => {
  try {
    const response = await axios.put(
      `/admin/categories/update/${categoryId}/no-image`,
      updateCategory
    );
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateCategoryChangeImage = async (formData, categoryId) => {
  try {
    const response = await axios.put(
      `/admin/categories/update/${categoryId}/change-image`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 30 * 1000,
      }
    );
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteCategory = async (categoryId) => {
  try {
    const response = await axios.delete(`/admin/categories/${categoryId}`, {
      method: "delete",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const moveCategory = async (move) => {
  try {
    const response = await axios.post("/admin/categories/move", move, {
      method: "post",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiCategoryForAdmin = {
  getAllCategory,
  getDetailCategory,
  createCategory,
  updateCategoryNoChangeImage,
  updateCategoryChangeImage,
  deleteCategory,
  moveCategory,
};

export default apiCategoryForAdmin;
