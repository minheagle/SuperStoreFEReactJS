import { put, call, takeLatest } from "redux-saga/effects";
import {
  getShopDetail,
  getShopDetailSuccess,
  getShopDetailFailure,
  getProductOfShop,
  getProductOfShopSuccess,
  getProductOfShopFailure,
} from "../../slice/public/shop.public.slice";
import shopApi from "../../api/public/shop.public.api";
import productApi from "../../api/public/product.public.api";

function* getShopDetailSaga(action) {
  try {
    const { sellerId } = action.payload;
    const response = yield call(shopApi.getDetailShop, sellerId);
    yield put(getShopDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getShopDetailFailure(error.message));
  }
}

function* getProductOfShopSaga(action) {
  try {
    const { shopId } = action.payload;
    const response = yield call(productApi.getByShopId, shopId);
    yield put(getProductOfShopSuccess(response.results.data));
  } catch (error) {
    yield put(getProductOfShopFailure(error.message));
  }
}

function* shopPublicSaga() {
  yield takeLatest(getShopDetail, getShopDetailSaga);
  yield takeLatest(getProductOfShop, getProductOfShopSaga);
}

export default shopPublicSaga;
