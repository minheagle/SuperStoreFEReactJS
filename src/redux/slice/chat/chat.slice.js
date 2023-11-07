import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_chat: {
    data: null,
  },
  receiver_id: {
    data: null,
  },
  add_new_chat: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
  get_detail_current: {
    data: null,
    loading: false,
    error: "",
  },
  get_all_chat: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
  find_chat: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
  add_message: {
    data: null,
    loading: false,
    message: "",
    error: "",
  },
  get_all_message: {
    data: [],
    loading: false,
    message: "",
    error: "",
  },
};

const chatSlice = createSlice({
  name: "Chat_Slice",
  initialState: initialState,
  reducers: {
    changeCurrentChat: (state, action) => {
      state.current_chat.data = action.payload;
    },
    changeReceiverId: (state, action) => {
      state.receiver_id.data = action.payload;
    },
    addNewChat: (state) => {
      state.add_new_chat.loading = true;
    },
    addNewChatSuccess: (state, action) => {
      state.add_new_chat.loading = false;
      state.add_new_chat.error = "";
      state.add_new_chat.data = action.payload;
    },
    addNewChatFailure: (state, action) => {
      state.add_new_chat.loading = false;
      state.add_new_chat.data = null;
      state.add_new_chat.error = action.payload;
    },
    getDetailCurrent: (state) => {
      state.get_detail_current.loading = true;
    },
    getDetailCurrentSuccess: (state, action) => {
      state.get_detail_current.loading = false;
      state.get_detail_current.error = "";
      state.get_detail_current.data = action.payload;
    },
    getDetailCurrentFailure: (state, action) => {
      state.get_detail_current.loading = false;
      state.get_detail_current.data = null;
      state.get_detail_current.error = action.payload;
    },
    getAllChat: (state) => {
      state.get_all_chat.loading = true;
    },
    getAllChatSuccess: (state, action) => {
      state.get_all_chat.loading = false;
      state.get_all_chat.error = "";
      state.get_all_chat.data = action.payload;
    },
    getAllChatFailure: (state, action) => {
      state.get_all_chat.loading = false;
      state.get_all_chat.data = [];
      state.get_all_chat.error = action.payload;
    },
    findChat: (state) => {
      state.find_chat.loading = true;
    },
    findChatSuccess: (state, action) => {
      state.find_chat.loading = false;
      state.find_chat.error = "";
      state.find_chat.data = action.payload;
    },
    findChatFailure: (state, action) => {
      state.find_chat.loading = false;
      state.find_chat.data = null;
      state.find_chat.error = action.payload;
    },
    addMessage: (state) => {
      state.add_message.loading = true;
    },
    addMessageSuccess: (state, action) => {
      state.add_message.loading = false;
      state.add_message.error = "";
      state.add_message.data = action.payload;
    },
    addMessageFailure: (state, action) => {
      state.add_message.loading = false;
      state.add_message.data = null;
      state.add_message.error = action.payload;
    },
    getAllMessage: (state) => {
      state.get_all_message.loading = true;
    },
    getAllMessageSuccess: (state, action) => {
      state.get_all_message.loading = false;
      state.get_all_message.error = "";
      state.get_all_message.data = action.payload;
    },
    getAllMessageFailure: (state, action) => {
      state.get_all_message.loading = false;
      state.get_all_message.data = [];
      state.get_all_message.error = action.payload;
    },
  },
});

export const {
  changeCurrentChat,
  changeReceiverId,
  addNewChat,
  addNewChatSuccess,
  addNewChatFailure,
  getDetailCurrent,
  getDetailCurrentSuccess,
  getDetailCurrentFailure,
  getAllChat,
  getAllChatSuccess,
  getAllChatFailure,
  findChat,
  findChatSuccess,
  findChatFailure,
  addMessage,
  addMessageSuccess,
  addMessageFailure,
  getAllMessage,
  getAllMessageSuccess,
  getAllMessageFailure,
} = chatSlice.actions;

export default chatSlice.reducer;
