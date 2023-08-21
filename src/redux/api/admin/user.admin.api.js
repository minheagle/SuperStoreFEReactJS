import axios from "../axiosInstance.js";

const getAllUser = async () => {
  try {
    const response = await axios.get("/admin/users", { withCredentials: true });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserDetail = async (userId) => {
  try {
    const response = await axios.get(`/admin/users/${userId}`);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiUserForAdmin = { getAllUser, getUserDetail };

export default apiUserForAdmin;
