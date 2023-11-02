import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ChatWindow from "./chat/ChatWindow";
import ChatList from "./chat/ChatList";
import NotAuthentication from "./chat/NotAuthentication";
import ROUTES from "../../constants/ROUTES";

const Chat = () => {
  const navigate = useNavigate();
  const [openChat, setOpenChat] = useState(false);
  const [openListChat, setOpenListChat] = useState(false);
  const [currentChat, setCurrentChat] = useState(null);
  const [receiverId, setReceiverId] = useState(null);

  // console.log(receiverId);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleToggleViewChat = (value) => {
    if (userData) {
      setOpenChat(value);
    } else {
      setOpenChat(false);
      return navigate(ROUTES.PUBLIC.LOGIN);
    }
  };

  const handleToggleListChat = (value) => {
    setOpenListChat(value);
  };

  const handleChangeCurrentChat = (value) => {
    setCurrentChat(value);
  };

  const handleChangeReceiverId = (value) => {
    setReceiverId(value);
  };

  return (
    <div className="fixed bottom-0 right-0 z-40 w-full flex justify-end items-center pr-2">
      {openChat ? (
        <div className="flex justify-center items-center border border-slate-300 rounded-lg">
          {openListChat ? (
            <div className="w-48 h-96 bg-white">
              <ChatList
                chatId={userData?.chatId}
                currentChat={currentChat}
                handleChangeCurrentChat={handleChangeCurrentChat}
                handleChangeReceiverId={handleChangeReceiverId}
              />
            </div>
          ) : (
            ""
          )}
          <div className="w-96 h-96 bg-white">
            <div className="w-full h-8 flex justify-between items-center border-b border-slate-300">
              <span className="font-medium pl-2">Chat</span>
              <div className="flex justify-center items-center gap-4">
                {userData ? (
                  <button onClick={() => handleToggleListChat(!openListChat)}>
                    <FontAwesomeIcon icon="fas fa-caret-square-right" />
                  </button>
                ) : (
                  <button>
                    <FontAwesomeIcon icon="fas fa-caret-square-right" />
                  </button>
                )}
                <button
                  onClick={() => handleToggleViewChat(false)}
                  className="w-6 h-6 text-white bg-red-600"
                >
                  <FontAwesomeIcon icon="fas fa-window-close" />
                </button>
              </div>
            </div>
            <div className="w-full h-88">
              {userData ? (
                <ChatWindow
                  currentChat={currentChat}
                  receiverId={receiverId}
                  handleChangeCurrentChat={handleChangeCurrentChat}
                  handleChangeReceiverId={handleChangeReceiverId}
                />
              ) : (
                <Navigate to={ROUTES.PUBLIC.LOGIN} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => handleToggleViewChat(true)}
          className="cursor-pointer w-24 h-12 flex justify-center items-center bg-primary text-white rounded"
        >
          <FontAwesomeIcon icon="fas fa-comment-dots" className="text-2xl" />
        </div>
      )}
    </div>
  );
};

export default Chat;
