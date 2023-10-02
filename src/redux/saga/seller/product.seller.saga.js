import { takeLatest, call, put } from "redux-saga/effects";
import {
  createProduct,
  createProductSuccess,
  createProductFailure,
} from "../../slice/seller/product.seller.slice";

function* createProductSaga() {
  try {
  } catch (error) {}
}

function* productForSellerSaga() {
  yield takeLatest(createProduct, createProductSaga);
}

export default productForSellerSaga;
