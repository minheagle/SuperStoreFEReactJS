import { useState, useEffect } from "react";
import { io } from "socket.io-client";

import chatApi from "../../../redux/api/chat/chat.api";

const ChatList = ({ chatId }) => {
  const [socket, setSocket] = useState(null);
  const [listChat, setListChat] = useState([]);

  useEffect(() => {
    async function getData(chatId) {
      try {
        const response = await chatApi.getAllUserById(chatId);
        setListChat(response.data);
      } catch (error) {}
    }
    getData(chatId);
  }, [chatId]);

  return (
    <div className="w-full h-full border-r border-slate-300">
      {listChat.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          <span>List chat is empty</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default ChatList;
