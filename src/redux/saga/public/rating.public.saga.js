import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllByProduct,
  getAllByProductSuccess,
  getAllByProductFailure,
} from "../../slice/public/rating.public.slice";
import ratingPublicApi from "../../api/public/rating.public.api";

function* getAllByProductSaga(action) {
  try {
    const { productId } = action.payload;
    const response = yield call(ratingPublicApi.getAll, productId);
    yield put(getAllByProductSuccess(response.results.data));
  } catch (error) {
    yield put(getAllByProductFailure(error.message));
  }
}

function* ratingPublicSaga() {
  yield takeLatest(getAllByProduct, getAllByProductSaga);
}

export default ratingPublicSaga;
