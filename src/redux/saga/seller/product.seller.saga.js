import { takeLatest, call, put } from "redux-saga/effects";
import {
  createProduct,
  createProductSuccess,
  createProductFailure,
  getAllList,
  getAllListSuccess,
  getAllListFailure,
} from "../../slice/seller/product.seller.slice";
import productForSellerApi from "../../api/seller/product/product.seller.api";

function* getAllListSaga(action) {
  try {
    const { shopId } = action.payload;
    const response = yield call(productForSellerApi.getAll, shopId);
    yield put(getAllListSuccess(response.results.data));
  } catch (error) {
    yield put(getAllListFailure(error.message));
  }
}

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
  yield takeLatest(getAllList, getAllListSaga);
}

export default productForSellerSaga;
