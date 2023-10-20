import { put, call, takeLatest } from "redux-saga/effects";
import {
  getAllVoucherOfUser,
  getAllVoucherOfUserSuccess,
  getAllVoucherOfUserFailure,
  getAllAvailable,
  getAllAvailableSuccess,
  getAllAvailableFailure,
  getVoucher,
  getVoucherSuccess,
  getVoucherFailure,
} from "../../slice/user/voucher.user.slice";
import voucherForUserApi from "../../api/user/voucher.user.api";

function* getAllVoucherOfUserSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(voucherForUserApi.getAllOfUser, userId);
    yield put(getAllVoucherOfUserSuccess(response.results.data));
  } catch (error) {
    yield put(getAllVoucherOfUserFailure(error.message));
  }
}

function* getAllAvailableSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(voucherForUserApi.getAllAvailable, userId);
    yield put(getAllAvailableSuccess(response.results.data));
  } catch (error) {
    yield put(getAllAvailableFailure(error.message));
  }
}

function* getVoucherSaga(action) {
  try {
    const { userId, listPromotionId, callback } = action.payload;
    const response = yield call(
      voucherForUserApi.getVoucher,
      userId,
      listPromotionId
    );
    yield put(getVoucherSuccess(response));
    yield callback.notification("Get voucher success");
    yield callback.goToList();
  } catch (error) {
    yield put(getVoucherFailure(error.message));
  }
}

function* voucherUserSaga() {
  yield takeLatest(getAllVoucherOfUser, getAllVoucherOfUserSaga);
  yield takeLatest(getAllAvailable, getAllAvailableSaga);
  yield takeLatest(getVoucher, getVoucherSaga);
}

export default voucherUserSaga;
