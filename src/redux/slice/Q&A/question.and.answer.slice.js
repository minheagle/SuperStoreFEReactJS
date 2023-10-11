import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment_by_product: {
    data: [],
    loading: false,
    error: "",
  },
  add_new_comment: {
    data: null,
    loading: false,
    error: "",
  },
};

const questionAndAnswerSlice = createSlice({
  name: "QUESTION_AND_ANSWER",
  initialState: initialState,
  reducers: {
    getCommentByProduct: (state) => {
      state.comment_by_product.loading = true;
    },
    getCommentByProductSuccess: (state, action) => {
      state.comment_by_product.loading = false;
      state.comment_by_product.error = "";
      state.comment_by_product.data = action.payload;
    },
    getCommentByProductFailure: (state) => {
      state.comment_by_product.loading = false;
      state.comment_by_product.data = [];
      state.comment_by_product.error = action.payload;
    },
    addComment: (state) => {
      state.add_new_comment.loading = true;
    },
    addCommentSuccess: (state, action) => {
      state.add_new_comment.loading = false;
      state.add_new_comment.error = "";
      state.add_new_comment.data = action.payload;
    },
    addCommentFailure: (state, action) => {
      state.add_new_comment.loading = false;
      state.add_new_comment.data = null;
      state.add_new_comment.error = action.payload;
    },
  },
});

export const {
  getCommentByProduct,
  getCommentByProductSuccess,
  getCommentByProductFailure,
  addComment,
  addCommentSuccess,
  addCommentFailure,
} = questionAndAnswerSlice.actions;

export default questionAndAnswerSlice.reducer;
