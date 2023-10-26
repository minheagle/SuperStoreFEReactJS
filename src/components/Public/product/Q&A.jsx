import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  getCommentByProduct,
  addComment,
} from "../../../redux/slice/Q&A/question.and.answer.slice";

import ListQA from "./ListQA";

const QuestionAndAnswer = ({ productId }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const [addQA, setAddQA] = useState(false);

  const { comment_by_product, add_new_comment } = useSelector(
    (state) => state.QA
  );

  useEffect(() => {
    dispatch(getCommentByProduct({ productId }));
  }, [productId, add_new_comment.loading]);

  const userData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const handleOnChangeComment = (e) => {
    const value = e.target.value;
    if (value.length < 256) {
      setComment(value);
    }
  };

  const handleToggleAddQA = (value) => {
    setAddQA(value);
  };

  const handleAddQuestionAndAnswer = () => {
    if (userData) {
      if (comment) {
        dispatch(
          addComment({
            createCommentRequest: {
              userId: userData.id,
              productId,
              content: comment,
              parentId: null,
            },
          })
        );
        setComment("");
      }
    }
  };
  return (
    <div className="w-full flex flex-col justify-start items-center p-2">
      <div className="w-full flex justify-start items-center pl-4">
        <h2 className="font-semibold">Q&A</h2>
      </div>
      <div className="w-full flex justify-center items-center p-4">
        {comment_by_product.data.length === 0 ? (
          <div className="w-full flex justify-center items-center">
            <span>No question and answer</span>
          </div>
        ) : (
          <ListQA
            listQA={comment_by_product.data}
            productId={productId}
            userId={userData?.id}
          />
        )}
      </div>
      {userData ? (
        <div className="w-full flex justify-start items-center">
          {addQA ? (
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
                onClick={() => handleAddQuestionAndAnswer()}
                className="shrink-0 w-12 h-6 bg-primary text-white rounded"
              >
                <FontAwesomeIcon icon="fas fa-paper-plane" />
              </button>
              <button
                onClick={() => handleToggleAddQA(false)}
                className="shrink-0 w-12 h-6 bg-red-600 text-white rounded"
              >
                <FontAwesomeIcon icon="fas fa-window-close" />
              </button>
            </div>
          ) : (
            <div className="pl-4">
              <button
                onClick={() => handleToggleAddQA(true)}
                className="px-2 py-1 bg-primary text-white rounded"
              >
                Add Q&A
              </button>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default QuestionAndAnswer;
