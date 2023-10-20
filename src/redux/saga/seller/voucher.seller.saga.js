import { call, put, takeLatest } from "redux-saga/effects";
import {
  getAllListOfSeller,
  getAllListOfSellerSuccess,
  getAllListOfSellerFailure,
  createVoucher,
  createVoucherSuccess,
  createVoucherFailure,
  toggleStatus,
  toggleStatusSuccess,
  toggleStatusFailure,
} from "../../slice/seller/voucher.seller.slice";
import voucherForSellerApi from "../../api/seller/voucher/voucher.seller.api";

function* getAllListOfSellerSaga(action) {
  try {
    const { sellerId } = action.payload;
    const response = yield call(voucherForSellerApi.getAllBySeller, sellerId);
    yield put(getAllListOfSellerSuccess(response.results.data));
  } catch (error) {
    yield put(getAllListOfSellerFailure(error.message));
  }
}

function* createVoucherSaga(action) {
  try {
    const { promotionRequestCreate, callback } = action.payload;
    const response = yield call(
      voucherForSellerApi.createVoucher,
      promotionRequestCreate
    );
    yield put(createVoucherSuccess(response));
    yield callback.goToList();
  } catch (error) {
    yield put(createVoucherFailure(error.message));
  }
}

function* toggleStatusSaga(action) {
  try {
    const { isActive, promotionId, callback } = action.payload;
    const response = yield call(
      voucherForSellerApi.toggleStatus,
      isActive,
      promotionId
    );
    yield put(toggleStatusSuccess(response));
    yield callback.notification("Change status success");
    yield callback.loadPage();
  } catch (error) {
    yield put(toggleStatusFailure(error.message));
  }
}

function* voucherForSellerSaga() {
  yield takeLatest(getAllListOfSeller, getAllListOfSellerSaga);
  yield takeLatest(createVoucher, createVoucherSaga);
  yield takeLatest(toggleStatus, toggleStatusSaga);
}

export default voucherForSellerSaga;
