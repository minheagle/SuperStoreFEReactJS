import axios from "../axiosInstance.js";

const createUser = async (newUser) => {
  try {
    const response = await axios.post("/admin/users/create", newUser);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUser = async () => {
  try {
    const response = await axios.get("/admin/users/list-user", {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserDetail = async (userName) => {
  try {
    const response = await axios.get(`/admin/users/${userName}`);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const apiUserForAdmin = { createUser, getAllUser, getUserDetail };

export default apiUserForAdmin;
