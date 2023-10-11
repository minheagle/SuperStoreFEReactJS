import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCartList,
  getCartListSuccess,
  getCartListFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
  updateQuantity,
  updateQuantitySuccess,
  updateQuantityFailure,
  deleteCartItem,
  deleteCartItemSuccess,
  deleteCartItemFailure,
  checkout,
  checkoutSuccess,
  checkoutFailure,
  saveOrder,
  saveOrderSuccess,
  saveOrderFailure,
} from "../../slice/cart/cart.slice";
import cartApi from "../../api/cart/cart.api";
import handleCart from "../../../utils/handle/handleTotalCartItem";

function* getCartListSaga(action) {
  try {
    const { userId } = action.payload;
    const response = yield call(cartApi.getAll, userId);
    yield put(
      getCartListSuccess({
        data: response.results.data,
        total: handleCart.getTotalCartItem(response.results.data),
      })
    );
    yield localStorage.setItem(
      "cartList",
      JSON.stringify(response.results.data)
    );
  } catch (error) {
    yield put(getCartListFailure(error.message));
  }
}

function* addToCartSaga(action) {
  try {
    const { productItem, userId } = action.payload;
    const response = yield call(cartApi.add, productItem, userId);
    yield put(
      addToCartSuccess({
        message: response.message,
        data: response.results.data,
        total: handleCart.getTotalCartItem(response.results.data),
      })
    );
    yield localStorage.setItem(
      "cartList",
      JSON.stringify(response.results.data)
    );
  } catch (error) {
    yield put(addToCartFailure(error.message));
  }
}

function* updateQuantitySaga(action) {
  try {
    const { cartId, quantity } = action.payload;
    const response = yield call(cartApi.updateQuantity, cartId, quantity);
    yield put(updateQuantitySuccess(response.results.data));
  } catch (error) {
    yield put(updateQuantityFailure(error.message));
  }
}

function* deleteCartItemSaga(action) {
  try {
    const { cartId } = action.payload;
    const response = yield call(cartApi.deleteCartItem, cartId);
    yield put(deleteCartItemSuccess(response.results.data));
    yield localStorage.setItem(
      "cartList",
      JSON.stringify(response.results.data)
    );
  } catch (error) {
    yield put(deleteCartItemFailure(error.message));
  }
}

function* checkoutSaga(action) {
  try {
    const { checkoutRequest, callback } = action.payload;
    const response = yield call(cartApi.checkout, checkoutRequest);
    yield put(checkoutSuccess(response.results.data));
    yield callback.openModalViewCheckout();
  } catch (error) {
    yield put(checkoutFailure(error.message));
  }
}

function* saveOrderSaga(action) {
  try {
    const { orderRequest, callback } = action.payload;
    const response = yield call(cartApi.saveOrder, orderRequest);
    yield put(saveOrderSuccess(response.results.data));
    yield callback.goToOrder();
  } catch (error) {
    yield put(saveOrderFailure(error.message));
  }
}

function* cartSaga() {
  yield takeLatest(getCartList, getCartListSaga);
  yield takeLatest(addToCart, addToCartSaga);
  yield takeLatest(updateQuantity, updateQuantitySaga);
  yield takeLatest(deleteCartItem, deleteCartItemSaga);
  yield takeLatest(checkout, checkoutSaga);
  yield takeLatest(saveOrder, saveOrderSaga);
}

export default cartSaga;
