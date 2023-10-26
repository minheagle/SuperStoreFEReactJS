import { put, call, takeLatest } from "redux-saga/effects";
import {
  getShopDetail,
  getShopDetailSuccess,
  getShopDetailFailure,
  getShopDetailByName,
  getShopDetailByNameSuccess,
  getShopDetailByNameFailure,
  getProductOfShop,
  getProductOfShopByName,
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

function* getShopDetailByNameSaga(action) {
  try {
    const { storeName } = action.payload;
    const response = yield call(shopApi.getDetailShopByName, storeName);
    yield put(getShopDetailByNameSuccess(response.results.data));
  } catch (error) {
    yield put(getShopDetailByNameFailure(error.message));
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

function* getProductOfShopByNameSaga(action) {
  try {
    const { storeName } = action.payload;
    const response = yield call(shopApi.getDetailShopByName, storeName);
    const response2 = yield call(
      productApi.getByShopId,
      response.results.data.id
    );
    yield put(getProductOfShopSuccess(response2.results.data));
  } catch (error) {
    yield put(getProductOfShopFailure(error.message));
  }
}

function* shopPublicSaga() {
  yield takeLatest(getShopDetail, getShopDetailSaga);
  yield takeLatest(getShopDetailByName, getShopDetailByNameSaga);
  yield takeLatest(getProductOfShop, getProductOfShopSaga);
  yield takeLatest(getProductOfShopByName, getProductOfShopByNameSaga);
}

export default shopPublicSaga;
