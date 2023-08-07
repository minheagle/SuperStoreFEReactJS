import { all } from "redux-saga/effects";
import userForAdminSaga from "./admin/user.admin.saga";
import authSaga from "./public/auth.public.saga";

function* rootSaga() {
  yield all([userForAdminSaga(), authSaga()]);
}

export default rootSaga;
