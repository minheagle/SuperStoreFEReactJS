import { put, call, takeLatest } from "redux-saga/effects";

import {
  getAllOrder,
  getAllOrderSuccess,
  getAllOrderFailure,
  getAllOrderConfirm,
  getAllOrderConfirmSuccess,
  getAllOrderConfirmFailure,
  confirmOrder,
  confirmOrderSuccess,
  confirmOrderFailure,
  rejectionOrder,
  rejectionOrderSuccess,
  rejectionOrderFailure,
} from "../../slice/seller/order.seller.slice";
import orderForSellerApi from "../../api/seller/order/order.seller.api";

function* getAllOrderSaga(action) {
  try {
    const { sellerId } = action.payload;
    const response = yield call(orderForSellerApi.getAllOrder, sellerId);
    yield put(getAllOrderSuccess(response.results.data));
  } catch (error) {
    yield put(getAllOrderFailure(error.message));
  }
}

function* getAllOrderConfirmSaga(action) {
  try {
  } catch (error) {}
}

function* confirmOrderSaga(action) {
  try {
    const { sellerId, orderId, callback } = action.payload;
    const response = yield call(
      orderForSellerApi.confirmOrder,
      sellerId,
      orderId
    );
    yield put(confirmOrderSuccess(response.body.results.data));
    yield callback.notification("Confirm order success");
  } catch (error) {
    yield put(confirmOrderFailure(error.message));
  }
}

function* rejectionOrderSaga(action) {
  try {
    const { sellerId, orderId, callback } = action.payload;
    const response = yield call(
      orderForSellerApi.rejectionOrder,
      sellerId,
      orderId
    );
    yield put(rejectionOrderSuccess(response.results.data));
    yield callback.notification("Rejection order success");
  } catch (error) {
    yield put(rejectionOrderFailure(error.message));
  }
}

function* orderForSellerSaga() {
  yield takeLatest(getAllOrder, getAllOrderSaga);
  yield takeLatest(getAllOrderConfirm, getAllOrderConfirmSaga);
  yield takeLatest(confirmOrder, confirmOrderSaga);
  yield takeLatest(rejectionOrder, rejectionOrderSaga);
}

export default orderForSellerSaga;
