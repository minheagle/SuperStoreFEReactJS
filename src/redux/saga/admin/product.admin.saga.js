import { takeLatest, call, put } from "redux-saga/effects";
import {
  createProduct,
  createProductSuccess,
  createProductFailure,
} from "../../slice/admin/product.slice";
import productApi from "../../api/admin/product.admin.api";
// import imageApi from "../../api/admin/image.admin.api";

function* createProductSaga(action) {
  try {
    const response = yield call(productApi.create, action.payload);
    console.log(response);
  } catch (error) {
    yield put(createProductFailure(error.message));
  }
}

function* productForAdminSaga() {
  yield takeLatest(createProduct, createProductSaga);
}

export default productForAdminSaga;
