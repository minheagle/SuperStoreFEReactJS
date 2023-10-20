import { put, call, takeLatest } from "redux-saga/effects";
import {
  getAllVoucherFromShop,
  getAllVoucherFromShopSuccess,
  getAllVoucherFromShopFailure,
  getVoucher,
  getVoucherSuccess,
  getVoucherFailure,
} from "../../slice/public/voucher.public.slice";
import voucherPublicApi from "../../api/public/voucher.public.api";

function* getAllVoucherFromShopSaga(action) {
  try {
    const { shopId } = action.payload;
    const response = yield call(voucherPublicApi.getAllFromShop, shopId);
    yield put(getAllVoucherFromShopSuccess(response.results.data));
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
  yield takeLatest(getVoucher, getVoucherSaga);
}

export default voucherPublicSaga;
