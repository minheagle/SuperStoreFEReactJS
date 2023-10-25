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
  updateProductItem,
  updateProductItemSuccess,
  updateProductItemFailure,
  updateImageProductItem,
  updateImageProductItemSuccess,
  updateImageProductItemFailure,
  deleteProduct,
  deleteProductSuccess,
  deleteProductFailure,
  deleteProductItem,
  deleteProductItemSuccess,
  deleteProductItemFailure,
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
    const { product, productItem, callback } = action.payload;
    const responseCreateProduct = yield call(
      productForSellerApi.createProduct,
      product
    );
    const responseCreateProductItem = yield call(
      productForSellerApi.createProductItem,
      productItem,
      responseCreateProduct.results.data.productId
    );
    yield call(
      productForSellerApi.confirmCreate,
      responseCreateProduct.results.data.productId
    );
    yield put(createProductSuccess(""));
    yield callback.goToListProduct();
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

function* updateProductItemSaga(action) {
  try {
    const { productItemId, itemRequestEdit, callback } = action.payload;
    const response = yield call(
      productForSellerApi.updateProductItem,
      productItemId,
      itemRequestEdit
    );
    yield put(updateProductItemSuccess(response));
    yield callback.reload();
  } catch (error) {
    yield put(updateProductItemFailure(error.message));
  }
}

function* updateImageProductItemSaga(action) {
  try {
    const { changeImageProductItem, callback } = action.payload;
    const response = yield call(
      productForSellerApi.changeImageForProductItem,
      changeImageProductItem
    );
    yield put(updateImageProductItemSuccess(response));
    yield callback.reload();
  } catch (error) {
    yield put(updateImageProductItemFailure(error.message));
  }
}

function* deleteProductSaga(action) {
  const { productId, callback, shopId } = action.payload;
  try {
    const response = yield call(productForSellerApi.deleteProduct, productId);
    yield put(deleteProductSuccess(response));
    const response2 = yield call(productForSellerApi.getAll, shopId);
    yield put(getAllListSuccess(response2.results.data));
    yield callback.notification("Delete product success !");
  } catch (error) {
    yield put(deleteProductFailure(error.message));
    yield callback.notification("Delete product failure !");
  } finally {
    yield callback.finish();
  }
}

function* deleteProductItemSaga(action) {
  try {
    const { productId, productItemId } = action.payload;
    const response = yield call(
      productForSellerApi.deleteProductItem,
      productId,
      productItemId
    );
    yield put(deleteProductItemSuccess(response));
  } catch (error) {
    yield put(deleteProductItemFailure(error.message));
  }
}

function* productForSellerSaga() {
  yield takeLatest(createProduct, createProductSaga);
  yield takeLatest(getAllList, getAllListSaga);
  yield takeLatest(getDetail, getDetailSaga);
  yield takeLatest(getProductItemDetail, getProductItemDetailSaga);
  yield takeLatest(updateProduct, updateProductSaga);
  yield takeLatest(updateProductItem, updateProductItemSaga);
  yield takeLatest(updateImageProductItem, updateImageProductItemSaga);
  yield takeLatest(deleteProduct, deleteProductSaga);
  yield takeLatest(deleteProductItem, deleteProductItemSaga);
}

export default productForSellerSaga;
