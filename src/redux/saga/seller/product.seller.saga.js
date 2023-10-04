import { takeLatest, call, put } from "redux-saga/effects";
import {
  createProduct,
  createProductSuccess,
  createProductFailure,
} from "../../slice/seller/product.seller.slice";
import productForSellerApi from "../../api/seller/product/product.seller.api";

function* createProductSaga(action) {
  try {
    const { product, productItem } = action.payload;
    const responseCreateProduct = yield call(
      productForSellerApi.createProduct,
      product
    );
    const responseCreateProductItem = yield call(
      productForSellerApi.createProductItem,
      productItem,
      responseCreateProduct.results.data.productId
    );
    yield put(createProductSuccess(""));
  } catch (error) {
    yield put(createProductFailure(error.message));
  }
}

function* productForSellerSaga() {
  yield takeLatest(createProduct, createProductSaga);
}

export default productForSellerSaga;
