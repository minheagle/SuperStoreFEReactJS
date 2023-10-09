import React from "react";
import Star from "react-rating-star-with-type";

import defaultAvatar from "../../../assets/default-avatar.jpg";

const CommentAndRating = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const handleRenderListComment = () => {
    return array?.map((item) => {
      return (
        <div
          key={item}
          className="w-full flex flex-col justify-start items-start gap-2 border border-slate-300 p-4 rounded"
        >
          <div className="w-full flex justify-start gap-4">
            <div className="w-12 h-12 shrink-0">
              <img
                src={defaultAvatar}
                alt=""
                className="object-cover aspect-square rounded-full"
              />
            </div>
            <div className="flex-1 flex justify-start items-center gap-2">
              <div className="flex flex-col ">
                <span>User {item}</span>
                <div className="flex justify-start items-center">
                  <Star
                    count={5}
                    value={4}
                    size={16}
                    color1="gray"
                    color2="orange"
                    edit={false}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">Comment</div>
        </div>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-center gap-4 p-4">
      <div className="w-full">Product Rating</div>
      <div className="w-full flex flex-col justify-start items-center gap-2">
        {handleRenderListComment()}
      </div>
    </div>
  );
};

export default CommentAndRating;
