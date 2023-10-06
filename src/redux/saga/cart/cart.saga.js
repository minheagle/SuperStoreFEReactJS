import { put, call, takeLatest } from "redux-saga/effects";
import {
  getCartList,
  getCartListSuccess,
  getCartListFailure,
  addToCart,
  addToCartSuccess,
  addToCartFailure,
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

function* cartSaga() {
  yield takeLatest(getCartList, getCartListSaga);
  yield takeLatest(addToCart, addToCartSaga);
}

export default cartSaga;
