import { put, call, takeLatest } from "redux-saga/effects";
import {
  getListOrder,
  getListOrderSuccess,
  getListOrderFailure,
  getLinkPayment,
  getLinkPaymentSuccess,
  getLinkPaymentFailure,
} from "../../slice/user/order.user.slice";
import orderUserApi from "../../api/user/order.user.api";

function* getListOrderSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(orderUserApi.getAll, userId);
    yield put(getListOrderSuccess(response.results.data));
  } catch (error) {
    yield put(getListOrderFailure(error.message));
  }
}

function* getLinkPaymentSaga(action) {
  try {
    const { paymentServiceRequest, callback } = action.payload;
    const response = yield call(
      orderUserApi.getLinkPayment,
      paymentServiceRequest
    );
    yield put(getLinkPaymentSuccess(response));
    yield callback.openPaymentPage(response.results.data.data.checkoutUrl);
  } catch (error) {
    yield put(getLinkPaymentFailure(error.message));
  }
}

function* orderForUserSaga() {
  yield takeLatest(getListOrder, getListOrderSaga);
  yield takeLatest(getLinkPayment, getLinkPaymentSaga);
}

export default orderForUserSaga;
