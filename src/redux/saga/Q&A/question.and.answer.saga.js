import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCommentByProduct,
  getCommentByProductSuccess,
  getCommentByProductFailure,
  addComment,
  addCommentSuccess,
  addCommentFailure,
} from "../../slice/Q&A/question.and.answer.slice";
import questionAndAnswerApi from "../../api/Q&A/question.and.answer.api";

function* getCommentByProductSaga(action) {
  try {
    const { productId } = action.payload;
    const response = yield call(
      questionAndAnswerApi.getListByProduct,
      productId
    );
    yield put(getCommentByProductSuccess(response.results.data));
  } catch (error) {
    yield put(getCommentByProductFailure(error.message));
  }
}

function* addCommentSaga(action) {
  try {
    const { createCommentRequest } = action.payload;
    const response = yield call(questionAndAnswerApi.add, createCommentRequest);
    yield put(addCommentSuccess(response));
  } catch (error) {
    yield put(addCommentFailure(error.message));
  }
}

function* questionAndAnswerSaga() {
  yield takeLatest(getCommentByProduct, getCommentByProductSaga);
  yield takeLatest(addComment, addCommentSaga);
}

export default questionAndAnswerSaga;
