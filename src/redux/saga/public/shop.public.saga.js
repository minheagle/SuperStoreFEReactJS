import { put, call, takeLatest } from "redux-saga/effects";
import {
  getShopDetail,
  getShopDetailSuccess,
  getShopDetailFailure,
} from "../../slice/public/shop.public.slice";
import shopApi from "../../api/public/shop.public.api";

function* getShopDetailSaga(action) {
  try {
    const { sellerId } = action.payload;
    const response = yield call(shopApi.getDetailShop, sellerId);
    console.log(response);
    yield put(getShopDetailSuccess(response));
  } catch (error) {
    yield put(getShopDetailFailure(error.message));
  }
}

function* shopPublicSaga() {
  yield takeLatest(getShopDetail, getShopDetailSaga);
}

export default shopPublicSaga;
