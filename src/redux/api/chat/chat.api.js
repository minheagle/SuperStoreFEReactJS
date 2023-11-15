import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatrealtimeforsuperstore-production.up.railway.app",
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

const getDetail = async (userId) => {
  try {
    const response = await instance.get(`/auth/get-detail/${userId}`);
    return response;
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

const receiveMessage = async (chatId) => {
  try {
    const response = await instance.get(`/messages/get-message/${chatId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const sendMessage = async (chatId, senderId, text) => {
  try {
    const response = await instance.post(`/messages/add-message`, {
      chatId,
      senderId,
      text,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createChat = async (senderId, receiverId) => {
  try {
    const response = await instance.post("/chats/create", {
      senderId,
      receiverId,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllChat = async (userId) => {
  try {
    const response = await instance.get(`/chats/${userId}`, {
      params: {
        userId,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const findChat = async (firstId, secondId) => {
  try {
    const response = await instance.get(`/chats/find/${firstId}/${secondId}`, {
      params: {
        firstId,
        secondId,
      },
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const chatApi = {
  createUser,
  getDetail,
  getAllUserById,
  changeUserName,
  changeAvatar,
  receiveMessage,
  sendMessage,
  createChat,
  getAllChat,
  findChat,
};

export default chatApi;
