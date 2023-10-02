import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllList,
  getAllListFailure,
  getAllListSuccess,
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

function* categoryPublicSaga() {
  yield takeLatest(getAllList, getAllCategorySaga);
}

export default categoryPublicSaga;
