import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import chatApi from "../../../redux/api/chat/chat.api";
import {
  changeCurrentChat,
  getDetailCurrent,
  changeReceiverId,
} from "../../../redux/slice/chat/chat.slice";

import defaultAvatar from "../../../assets/default-avatar.jpg";

const ChatListItem = ({
  item,
  currentId,
  currentChat,
  listUserOnline,
  socket,
  handleChangeReceiverId,
}) => {
  const dispatch = useDispatch();
  const secondId = item?.members?.find((item) => item !== currentId);

  const { receiver_id } = useSelector((state) => state.Chat);

  const [data, setData] = useState(null);
  const [isOnline, setIsOnline] = useState(false);
  const [listNewMessage, setListNewMessage] = useState([]);

  useEffect(() => {
    if (secondId) {
      async function getData() {
        const response = await chatApi.getDetail(secondId);
        setData(response.data);
      }
      getData();
    }
  }, [secondId]);

  useEffect(() => {
    const findUser = listUserOnline?.find((item) => item?.userId === secondId);
    if (findUser) {
      setIsOnline(true);
    } else {
      setIsOnline(false);
    }
  }, [listUserOnline?.length]);

  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      if (data?.chatId === item?._id && !currentChat) {
        setListNewMessage((prev) => [...prev, data]);
      } else if (currentChat === item?._id) {
        setListNewMessage([]);
      }
    });
    return () => setListNewMessage([]);
  }, [currentChat]);

  const handleSelectChatItem = () => {
    dispatch(changeCurrentChat(item._id));
    dispatch(changeReceiverId(secondId));
  };

  return (
    <div
      onClick={() => handleSelectChatItem()}
      className={`relative w-full h-10 cursor-pointer flex justify-start items-center gap-2 rounded-2xl ${
        item._id === currentChat ? "bg-primary text-white" : "bg-slate-100"
      }`}
    >
      {listNewMessage?.length > 0 ? (
        <div className="absolute -top-3 right-0 w-6 h-6 flex justify-center items-center bg-white rounded-full">
          <span className="text-primary">!</span>
        </div>
      ) : (
        ""
      )}
      <div className="shrink-0 pl-1.5 flex justify-center items-center">
        <div className="w-8 h-8">
          {data?.avatarImage ? (
            <img
              src={data.avatarImage}
              alt=""
              className="w-full object-cover aspect-square rounded-full"
            />
          ) : (
            <img
              src={defaultAvatar}
              alt=""
              className="w-full object-cover aspect-square rounded-full"
            />
          )}
        </div>
      </div>
      <div className="flex-1 h-12 flex justify-start items-center line-clamp-1">
        <span>{data?.username}</span>
      </div>
      <div className="shrink-0 w-8 h-12 flex justify-center items-center">
        {isOnline ? (
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>
        ) : (
          <div className="w-2 h-2 bg-slate-500 rounded-full"></div>
        )}
      </div>
    </div>
  );
};

export default ChatListItem;
