import { takeLatest, call, put } from "redux-saga/effects";
import {
  createUser,
  createUserSuccess,
  createUserFailure,
  getAllUser,
  getAllUserSuccess,
  getAllUserFailure,
  getUserDetail,
  getUserDetailSuccess,
  getUserDetailFailure,
} from "../../slice/admin/userForAdmin.slice";
import ApiUserForAdmin from "../../api/admin/user.admin.api";

function* createUserForAdminSaga(action) {
  try {
    const createUser = yield call(ApiUserForAdmin.createUser, action.payload);
    yield put(createUserSuccess(createUser));
  } catch (error) {
    yield put(createUserFailure(error.message));
  }
}

function* getAllUserForAdminSaga() {
  try {
    const listUser = yield call(ApiUserForAdmin.getAllUser);
    yield put(getAllUserSuccess(listUser));
  } catch (error) {
    yield put(getAllUserFailure(error.message));
  }
}

function* getUserDetailForAdminSaga(action) {
  try {
    const userDetail = yield call(
      ApiUserForAdmin.getUserDetail,
      action.payload
    );
    yield put(getUserDetailSuccess(userDetail));
  } catch (error) {
    yield put(getUserDetailFailure(error.message));
  }
}

function* userForAdminSaga() {
  yield takeLatest(createUser, createUserForAdminSaga);
  yield takeLatest(getAllUser, getAllUserForAdminSaga);
  yield takeLatest(getUserDetail, getUserDetailForAdminSaga);
}

export default userForAdminSaga;
