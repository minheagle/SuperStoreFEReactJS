import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllListProduct,
  getAllListSuccess,
  getAllListFailure,
  search,
  searchSuccess,
  searchFailure,
  getDetail,
  getDetailSuccess,
  getDetailFailure,
} from "../../slice/public/product.public.slice";
import { getShopDetailSuccess } from "../../slice/public/shop.public.slice";
import productPublicApi from "../../api/public/product.public.api";
import shopApi from "../../api/public/shop.public.api";

function* getAllListSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(productPublicApi.getAll, params);

    yield put(
      getAllListSuccess({
        data: response.results.data,
        total: response.pagination.totalElements,
      })
    );
  } catch (error) {
    yield put(getAllListFailure(error.message));
  }
}

function* searchSaga(action) {
  try {
    const { params } = action.payload;
    const response = yield call(productPublicApi.search, params);
    yield put(searchSuccess(response.results.data));
  } catch (error) {
    yield put(searchFailure(error.message));
  }
}

function* getDetailSaga(action) {
  try {
    const { productId } = action.payload;
    const response = yield call(productPublicApi.getDetail, productId);
    const data = response.results.data;
    const shopResponse = yield call(shopApi.getDetailShop, data.sellerId);
    yield put(getDetailSuccess(data));
    yield put(getShopDetailSuccess(shopResponse.results.data));
  } catch (error) {
    yield put(getDetailFailure(error.message));
  }
}

function* productPublicSaga() {
  yield takeLatest(getAllListProduct, getAllListSaga);
  yield takeLatest(search, searchSaga);
  yield takeLatest(getDetail, getDetailSaga);
}

export default productPublicSaga;
