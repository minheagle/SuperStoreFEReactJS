import React from "react";
import { format } from "timeago.js";

const Message = ({ data, userData }) => {
  //   console.log(data);
  return (
    <div className="w-full">
      {data.senderId === userData.chatId ? (
        <div className="w-full flex justify-end items-center">
          <div className="flex flex-col justify-start items-end">
            <span className="text-white font-normal text-sm px-2 py-1 bg-primary rounded-xl">
              {data.text}
            </span>
            <span className="font-light text-xs">{format(data.updatedAt)}</span>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-start items-center">
          <div className="flex flex-col justify-start items-start">
            <span className="font-normal text-sm px-2 py-1 bg-slate-100 rounded-xl">
              {data.text}
            </span>
            <span className="font-light text-xs">{format(data.updatedAt)}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Message;
