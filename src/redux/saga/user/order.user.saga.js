import { put, call, takeLatest } from "redux-saga/effects";
import {
  getListOrder,
  getListOrderSuccess,
  getListOrderFailure,
  getLinkPayment,
  getLinkPaymentSuccess,
  getLinkPaymentFailure,
  handlePayment,
  handlePaymentSuccess,
  handlePaymentFailure,
  cancelOrder,
  cancelOrderSuccess,
  cancelOrderFailure,
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
    if (response?.results?.data?.desc === "Đơn thanh toán đã tồn tại") {
      yield callback.notification("Payment already exists !");
    } else {
      yield callback.openPaymentPage(response.results.data.data.checkoutUrl);
    }
  } catch (error) {
    yield put(getLinkPaymentFailure(error.message));
  }
}

function* handlePaymentSaga(action) {
  try {
    const { informationStatusPayment, callback } = action.payload;
    const response = yield call(
      orderUserApi.handlePayment,
      informationStatusPayment
    );
    yield put(handlePaymentSuccess(response));
    yield callback.getNewOrder();
    yield callback.redirect();
  } catch (error) {
    yield put(handlePaymentFailure(error.message));
  }
}

function* cancelOrderSaga(action) {
  const { orderId, callback, userId } = action.payload;
  try {
    const response = yield call(orderUserApi.cancelOrder, orderId);
    yield put(cancelOrderSuccess(response));
    const response2 = yield call(orderUserApi.getAll, userId);
    yield put(getListOrderSuccess(response2.results.data));
    yield callback.notification("Delete order success !");
  } catch (error) {
    yield put(cancelOrderFailure(error));
    yield callback.notification("Delete order failure !");
  } finally {
    yield callback.finish();
  }
}

function* orderForUserSaga() {
  yield takeLatest(getListOrder, getListOrderSaga);
  yield takeLatest(getLinkPayment, getLinkPaymentSaga);
  yield takeLatest(handlePayment, handlePaymentSaga);
  yield takeLatest(cancelOrder, cancelOrderSaga);
}

export default orderForUserSaga;
