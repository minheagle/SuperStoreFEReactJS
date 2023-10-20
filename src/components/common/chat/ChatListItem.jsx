import { useEffect, useState } from "react";

import chatApi from "../../../redux/api/chat/chat.api";

import defaultAvatar from "../../../assets/default-avatar.jpg";

const ChatListItem = ({
  item,
  currentId,
  currentChat,
  handleChangeCurrentChat,
  handleChangeReceiverId,
}) => {
  const secondId = item?.members?.find((item) => item !== currentId);

  //   console.log(item);

  const [data, setData] = useState(false);

  useEffect(() => {
    if (secondId) {
      async function getData() {
        const response = await chatApi.getDetail(secondId);
        setData(response.data);
      }
      getData();
    }
  }, [secondId]);

  const handleSelectChatItem = () => {
    handleChangeCurrentChat(item._id);
    handleChangeReceiverId(secondId);
  };

  return (
    <div
      onClick={() => handleSelectChatItem()}
      className={`w-full h-10 cursor-pointer flex justify-start items-center gap-2 rounded-2xl ${
        item._id === currentChat ? "bg-primary text-white" : "bg-slate-100"
      }`}
    >
      <div className="shrink-0 w-8 h-8 p-1">
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
      <div className="flex-1 h-12 flex justify-start items-center">
        <span>{data?.username}</span>
      </div>
    </div>
  );
};

export default ChatListItem;
