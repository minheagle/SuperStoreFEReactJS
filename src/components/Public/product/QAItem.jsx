import { useState } from "react";
import { useDispatch } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { addComment } from "../../../redux/slice/Q&A/question.and.answer.slice";

const QAItem = ({ item, productId, userId }) => {
  const dispatch = useDispatch();
  const [isReply, setIsReply] = useState(false);
  const [comment, setComment] = useState("");
  const [showChild, setShowChild] = useState(false);

  const handleReplyComment = ({ userId, productId, content, parentId }) => {
    dispatch(
      addComment({
        createCommentRequest: {
          userId,
          productId,
          content,
          parentId,
        },
      })
    );
    setComment("");
  };

  const handleToggleReply = (value) => {
    console.log(item.id);
    setIsReply(value);
  };

  const handleToggleShowChild = (value) => {
    setShowChild(value);
  };

  const handleOnChangeComment = (e) => {
    const value = e.target.value;
    if (value.length < 256) {
      setComment(value);
    }
  };

  const handleRenderChildComment = (data = []) => {
    return data?.map((item) => {
      return (
        <QAItem
          key={item.id}
          item={item}
          productId={productId}
          userId={userId}
        />
      );
    });
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-start items-center gap-2">
        <span className="w-full flex justify-start items-center font-medium">
          From : {item.user}
        </span>
        <span className="w-full flex justify-start items-start">
          {item.content}
        </span>
        <div className="w-full flex justify-start items-center gap-4">
          <button
            onClick={() => handleToggleReply(!isReply)}
            className="px-2 py-1 bg-slate-300 text-white rounded"
          >
            {isReply ? "Not Reply" : "Reply"}
          </button>
          {item.childComments.length !== 0 ? (
            <button
              onClick={() => handleToggleShowChild(!showChild)}
              className="px-2 py-1 bg-slate-300 text-white rounded"
            >
              {showChild ? "Hide Reply" : "Show reply"}
            </button>
          ) : (
            ""
          )}
        </div>
        <div className="w-full pl-8">
          {showChild ? handleRenderChildComment(item.childComments) : ""}
        </div>
        {userId ? (
          isReply ? (
            <div className="w-full flex justify-start items-center">
              <div className="w-1/2 flex justify-start items-center gap-2 p-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => handleOnChangeComment(e)}
                    className="w-full outline-none border border-slate-300 rounded pl-2"
                  />
                </div>
                <button
                  onClick={() =>
                    handleReplyComment({
                      userId,
                      productId,
                      content: comment,
                      parentId: item.id,
                    })
                  }
                  className="shrink-0 w-12 h-6 bg-primary text-white rounded"
                >
                  <FontAwesomeIcon icon="fas fa-paper-plane" />
                </button>
              </div>
            </div>
          ) : (
            ""
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default QAItem;
