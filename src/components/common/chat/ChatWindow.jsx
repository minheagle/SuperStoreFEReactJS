import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getAllMessage,
  addMessage,
} from "../../../redux/slice/chat/chat.slice";
import chatApi from "../../../redux/api/chat/chat.api";

import Message from "./Message";

const ChatWindow = ({
  currentChat,
  receiverId,
  handleChangeCurrentChat,
  handleChangeReceiverId,
}) => {
  const dispatch = useDispatch();
  const socket = useRef();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [listUserOnline, setListUserOnline] = useState([]);
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const { get_all_message } = useSelector((state) => state.Chat);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  useEffect(() => {
    if (currentChat) {
      dispatch(
        getAllMessage({
          chatId: currentChat,
        })
      );
    }
  }, [currentChat]);

  useEffect(() => {
    setMessages(get_all_message.data);
  }, [get_all_message.data]);

  useEffect(() => {
    const URL = "ws://localhost:5000";
    socket.current = io(URL);
    socket.current.emit("add-user", userData.chatId);
    socket.current.on("get-users", (users) => {
      setListUserOnline(users);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    if (sendMessage !== null) {
      socket.current.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data);
      setReceivedMessage(data);
    });
  }, []);

  useEffect(() => {
    if (receivedMessage !== null && receivedMessage.chatId === currentChat) {
      setMessages([...messages, receivedMessage]);
    }
  }, [receivedMessage]);

  const handleSendMessage = async () => {
    if (socket && newMessage) {
      dispatch(
        addMessage({
          chatId: currentChat,
          senderId: userData.chatId,
          text: newMessage,
          callback: {
            getNewMessage: (data) => setMessages([...messages, data]),
          },
        })
      );
      setSendMessage({
        chatId: currentChat,
        senderId: userData.chatId,
        text: newMessage,
        receiverId,
      });
      setNewMessage("");
    }
  };

  const handleRenderListMessage = () => {
    return messages?.map((item, index) => {
      return (
        <div key={index} className="w-full">
          <Message data={item} userData={userData} />
        </div>
      );
    });
  };

  return currentChat ? (
    <div className="w-full h-88 flex flex-col justify-start items-center">
      <div className="w-full h-6 flex justify-start items-center border-b border-slate-300 pl-2">
        <button
          onClick={() => {
            handleChangeCurrentChat(null);
            handleChangeReceiverId(null);
          }}
        >
          <FontAwesomeIcon icon="fas fa-arrow-left" className="" />
        </button>
      </div>
      <div className="flex-1 w-full max-h-[300px] flex flex-col justify-end items-center gap-2 p-2 overflow-y-scroll">
        {handleRenderListMessage()}
      </div>
      <div className="shrink-0 w-full h-10 flex justify-start items-center gap-2 border-t border-slate-300 p-2">
        <div className="flex-1 flex justify-center items-start">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="w-full h-6 outline-none border border-slate-300 rounded pl-2"
          />
        </div>
        <button
          onClick={() => handleSendMessage()}
          className="shrink-0 w-12 h-6 flex justify-center items-center bg-primary text-white rounded"
        >
          <FontAwesomeIcon icon="fas fa-paper-plane" />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full flex justify-center items-center py-4">
      Tap your chat
    </div>
  );
};

export default ChatWindow;
