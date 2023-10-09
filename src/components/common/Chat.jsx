import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import NotAuthentication from "./chat/NotAuthentication";

const Chat = () => {
  const [openChat, setOpenChat] = useState(false);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const handleToggleViewChat = (value) => {
    setOpenChat(value);
  };

  return (
    <div className="sticky bottom-0 right-0 z-40 w-full flex justify-end items-center pr-2">
      {openChat ? (
        <div className="w-96 h-96 border border-slate-300 bg-white rounded">
          <div className="w-full h-6 flex justify-between items-center border-b border-slate-300">
            <span className="font-medium pl-2">Chat</span>
            <div className="flex justify-center items-center gap-4">
              <button>
                <FontAwesomeIcon icon="fas fa-caret-square-right" />
              </button>
              <button
                onClick={() => handleToggleViewChat(false)}
                className="w-6 h-6 text-white bg-red-600"
              >
                <FontAwesomeIcon icon="fas fa-window-close" />
              </button>
            </div>
          </div>
          {userData ? "" : <NotAuthentication />}
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
