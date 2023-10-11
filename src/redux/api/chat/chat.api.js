import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
  timeout: 10 * 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const createUser = async (username) => {
  try {
    const response = await instance.post("/auth/register", { username });
    return response.data;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUserById = async (id) => {
  try {
    const response = await instance.get(`/auth/allusers/${id}`, {
      params: {
        id,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changeUserName = async (id, username) => {
  try {
    const response = await instance.post(`/auth/set-user-name/${id}`, username);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changeAvatar = async (id, image) => {
  try {
    const response = await instance.post(`/auth/set-avatar/${id}`, image);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const receiveMessage = async (from, to) => {
  try {
    const response = await instance.post(`/messages/get-message`, { from, to });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendMessage = async (from, to, message) => {
  try {
    const response = await instance.post(`/messages/add-message`, {
      from,
      to,
      message,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const chatApi = {
  createUser,
  getAllUserById,
  changeUserName,
  changeAvatar,
  receiveMessage,
  sendMessage,
};

export default chatApi;
