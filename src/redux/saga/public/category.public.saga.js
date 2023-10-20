import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllList,
  getAllListFailure,
  getAllListSuccess,
  getAllLeaf,
  getAllLeafSuccess,
  getAllLeafFailure,
} from "../../slice/public/category.public.slice";
import categoryPublicApi from "../../api/public/category.public.api";

function* getAllCategorySaga() {
  try {
    const response = yield call(categoryPublicApi.getAll);
    yield put(getAllListSuccess(response.results));
  } catch (error) {
    yield put(getAllListFailure(error.message));
  }
}

function* getAllLeafSaga() {
  try {
    const response = yield call(categoryPublicApi.getAllLeaf);
    yield put(getAllLeafSuccess(response.results));
  } catch (error) {
    yield put(getAllLeafFailure(error.message));
  }
}

function* categoryPublicSaga() {
  yield takeLatest(getAllList, getAllCategorySaga);
  yield takeLatest(getAllLeaf, getAllLeafSaga);
}

export default categoryPublicSaga;
