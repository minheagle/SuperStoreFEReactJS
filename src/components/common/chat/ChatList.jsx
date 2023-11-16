import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllChat } from "../../../redux/slice/chat/chat.slice";

import ChatListItem from "./ChatListItem";

const ChatList = ({
  chatId,
  currentChat,
  listUserOnline,
  socket,
  handleChangeReceiverId,
}) => {
  const dispatch = useDispatch();

  const { get_all_chat } = useSelector((state) => state.Chat);

  useEffect(() => {
    dispatch(getAllChat({ userId: chatId }));
  }, [chatId]);

  const handleRenderListChat = () => {
    return get_all_chat?.data?.map((item) => {
      // console.log(item);
      return (
        <div key={item._id} className="w-full">
          <ChatListItem
            item={item}
            currentId={chatId}
            currentChat={currentChat}
            listUserOnline={listUserOnline}
            socket={socket}
            handleChangeReceiverId={handleChangeReceiverId}
          />
        </div>
      );
    });
  };

  return (
    <div className="w-full h-full border-r border-slate-300 rounded-tl-xl">
      {get_all_chat?.data?.length === 0 ? (
        <div className="w-full flex justify-center items-center">
          <span>List chat is empty</span>
        </div>
      ) : (
        <div className="w-full flex flex-col justify-start items-center gap-2 rounded-tl-xl p-2 overflow-auto touch-auto">
          {handleRenderListChat()}
        </div>
      )}
    </div>
  );
};

export default ChatList;
