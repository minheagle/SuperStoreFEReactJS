import { all } from "redux-saga/effects";
import userForAdminSaga from "./admin/user.admin.saga";
import productForAdminSaga from "./admin/product.admin.saga";
import authSaga from "./public/auth.public.saga";

function* rootSaga() {
  yield all([userForAdminSaga(), productForAdminSaga(), authSaga()]);
}

export default rootSaga;
