import axios from "../axiosInstance.js";

const register = async (formRegister) => {
  try {
    const response = await axios.post("/auth/register", formRegister, {
      method: "post",
    });
    return response.results;
  } catch (error) {
    const { data } = error.response;
    const errors = data?.map((item) => {
      return {
        field: item.field,
        message: item.defaultMessage,
      };
    });
    throw errors;
  }
};

const addChatId = async (userId, chatId) => {
  try {
    const response = await axios.post(`/auth/add-chat-id/${userId}`, {
      chatId,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const login = async (formLogin) => {
  try {
    const response = await axios.post("/auth/login", formLogin, {
      withCredentials: true,
      method: "post",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserInfo = async (userNameToken) => {
  try {
    const response = await axios.get(`/users/${userNameToken}`, {
      withCredentials: true,
      method: "get",
    });
    return response.results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const authApi = { login, logout, register, addChatId, getUserInfo };

export default authApi;
