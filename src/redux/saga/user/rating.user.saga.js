import { call, put, takeLatest } from "redux-saga/effects";
import {
  createRating,
  createRatingSuccess,
  createRatingFailure,
} from "../../slice/user/rating.user.slice";
import productReviewForUserApi from "../../api/user/rating.user.api";

function* createRatingSaga(action) {
  const { productReviewRequest, callback } = action.payload;
  try {
    const response = yield call(
      productReviewForUserApi.createRating,
      productReviewRequest
    );
    yield put(createRatingSuccess(response));
    yield callback.notification("Create rating success !");
  } catch (error) {
    yield put(createRatingFailure(error.message));
    yield callback.notification("Create rating failure !");
  } finally {
    yield callback.closeModal();
  }
}

function* productReviewForUserSaga() {
  yield takeLatest(createRating, createRatingSaga);
}

export default productReviewForUserSaga;
