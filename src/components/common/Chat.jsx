import { useState, useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleChat } from "../../redux/slice/UIPublic.slice";

import ChatWindow from "./chat/ChatWindow";
import ChatList from "./chat/ChatList";
import ROUTES from "../../constants/ROUTES";

const Chat = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const socket = useRef();
  const [openListChat, setOpenListChat] = useState(false);
  const [receiverId, setReceiverId] = useState(null);
  const [listUserOnline, setListUserOnline] = useState([]);

  const { isOpen } = useSelector((state) => state.UIPublic.chat);
  const { current_chat, receiver_id } = useSelector((state) => state.Chat);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleToggleViewChat = (value) => {
    if (userData) {
      dispatch(toggleChat(value));
    } else {
      dispatch(toggleChat(false));
      return navigate(ROUTES.PUBLIC.LOGIN);
    }
  };

  const handleToggleListChat = (value) => {
    setOpenListChat(value);
  };

  const handleChangeReceiverId = (value) => {
    setReceiverId(value);
  };

  return (
    <div className="fixed bottom-0 right-0 z-40 w-full flex justify-end items-center pr-2">
      {isOpen ? (
        <div className="flex justify-center items-center border border-slate-300 rounded-lg">
          {openListChat ? (
            <div className="w-48 h-96 bg-white">
              <ChatList
                chatId={userData?.chatId}
                currentChat={current_chat?.data}
                listUserOnline={listUserOnline}
                socket={socket}
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
                  currentChat={current_chat?.data}
                  socket={socket}
                  setListUserOnline={setListUserOnline}
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
