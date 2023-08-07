import axios from "../axiosInstance.js";

const register = async (formRegister) => {
  try {
    const response = await axios.post("/users/register", formRegister);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (formLogin) => {
  try {
    const response = await axios.post("/users/login", formLogin);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async (userId) => {
  try {
    const response = await axios.get(`/users/logout/${userId}`);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserInfo = async (userId) => {
  try {
    const response = await axios.get(`/users/${userId}`);
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const authApi = { login, logout, register, getUserInfo };

export default authApi;
