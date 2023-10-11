import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ChatWindow from "./chat/ChatWindow";
import ChatList from "./chat/ChatList";
import NotAuthentication from "./chat/NotAuthentication";

const Chat = () => {
  const [openChat, setOpenChat] = useState(false);
  const [openListChat, setOpenListChat] = useState(false);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const handleToggleViewChat = (value) => {
    setOpenChat(value);
  };

  const handleToggleListChat = (value) => {
    setOpenListChat(value);
  };
  return (
    <div className="sticky bottom-0 right-0 z-40 w-full flex justify-end items-center  pr-2">
      {openChat ? (
        <div className="flex justify-center items-center border border-slate-300 rounded">
          {openListChat ? (
            <div className="w-48 h-96 bg-white">
              <ChatList chatId={userData?.chatId} />
            </div>
          ) : (
            ""
          )}
          <div className="w-96 h-96 bg-white">
            <div className="w-full h-6 flex justify-between items-center border-b border-slate-300">
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
            {userData ? <ChatWindow /> : <NotAuthentication />}
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
