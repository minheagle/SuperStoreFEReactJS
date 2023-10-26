import { call, put, takeLatest } from "redux-saga/effects";
import {
  createRating,
  createRatingSuccess,
  createRatingFailure,
} from "../../slice/user/rating.user.slice";
import productReviewForUserApi from "../../api/user/rating.user.api";

function* createRatingSaga(action) {
  try {
  } catch (error) {}
}

function* productReviewForUserSaga() {
  yield takeLatest(createRating, createRatingSaga);
}

export default productReviewForUserSaga;
