import { put, call, takeLatest } from "redux-saga/effects";
import {
  getAllVoucherFromShop,
  getAllVoucherFromShopByName,
  getAllVoucherFromShopSuccess,
  getAllVoucherFromShopFailure,
  getVoucher,
  getVoucherSuccess,
  getVoucherFailure,
} from "../../slice/public/voucher.public.slice";
import voucherPublicApi from "../../api/public/voucher.public.api";
import shopPublicSaga from "./shop.public.saga";

function* getAllVoucherFromShopSaga(action) {
  try {
    const { shopId } = action.payload;
    const response = yield call(voucherPublicApi.getAllFromShop, shopId);
    yield put(getAllVoucherFromShopSuccess(response.results.data));
  } catch (error) {
    yield put(getAllVoucherFromShopFailure(error.message));
  }
}

function* getAllVoucherFromShopByNameSaga(action) {
  try {
    const { storeName } = action.payload;
    const response = yield call(shopApi.getDetailShopByName, storeName);
    const response2 = yield call(
      voucherPublicApi.getAllFromShop,
      response.results.data.id
    );
    yield put(getAllVoucherFromShopSuccess(response2.results.data));
  } catch (error) {
    yield put(getAllVoucherFromShopFailure(error.message));
  }
}

function* getVoucherSaga(action) {
  try {
    const { userId, listPromotionId, callback } = action.payload;
    const response = yield call(
      voucherPublicApi.getVoucher,
      userId,
      listPromotionId
    );
    yield put(getVoucherSuccess(response));
    yield callback.notification("Get voucher success !");
  } catch (error) {
    yield put(getVoucherFailure(error.message));
  }
}

function* voucherPublicSaga() {
  yield takeLatest(getAllVoucherFromShop, getAllVoucherFromShopSaga);
  yield takeLatest(
    getAllVoucherFromShopByName,
    getAllVoucherFromShopByNameSaga
  );
  yield takeLatest(getVoucher, getVoucherSaga);
}

export default voucherPublicSaga;
