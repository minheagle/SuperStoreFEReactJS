import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  timeout: 10 * 1000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

const createUser = async () => {
  try {
  } catch (error) {}
};

const receiveMessage = async () => {
  try {
  } catch (error) {}
};

const sendMessage = async () => {
  try {
  } catch (error) {}
};

const chatApi = { createUser, receiveMessage, sendMessage };

export default chatApi;
