import { takeLatest, call, put } from "redux-saga/effects";
import {
  createProduct,
  createProductSuccess,
  createProductFailure,
  getAllList,
  getAllListSuccess,
  getAllListFailure,
  getDetail,
  getDetailSuccess,
  getDetailFailure,
  getProductItemDetail,
  getProductItemDetailSuccess,
  getProductItemDetailFailure,
  updateProduct,
  updateProductSuccess,
  updateProductFailure,
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

function* getDetailSaga(action) {
  try {
    const { productId } = action.payload;
    const response = yield call(
      productForSellerApi.getDetailProduct,
      productId
    );
    yield put(getDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getDetailFailure(error.message));
  }
}

function* getProductItemDetailSaga(action) {
  try {
    const { productId, productItemId } = action.payload;
    const response = yield call(
      productForSellerApi.getDetailProductItem,
      productId,
      productItemId
    );
    yield put(getProductItemDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getProductItemDetailFailure(error.message));
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

function* updateProductSaga(action) {
  try {
    const { productId, updateProductForm, callback } = action.payload;
    const response = yield call(
      productForSellerApi.updateProduct,
      productId,
      updateProductForm
    );
    yield put(updateProductSuccess(response.message));
    yield callback.goToEditPage();
  } catch (error) {
    yield put(updateProductFailure(error.message));
  }
}

function* productForSellerSaga() {
  yield takeLatest(createProduct, createProductSaga);
  yield takeLatest(getAllList, getAllListSaga);
  yield takeLatest(getDetail, getDetailSaga);
  yield takeLatest(getProductItemDetail, getProductItemDetailSaga);
  yield takeLatest(updateProduct, updateProductSaga);
}

export default productForSellerSaga;
