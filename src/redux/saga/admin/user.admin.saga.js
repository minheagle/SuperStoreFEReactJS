import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllUser,
  getAllUserSuccess,
  getAllUserFailure,
  getUserDetail,
  getUserDetailSuccess,
  getUserDetailFailure,
} from "../../slice/userForAdmin.slice";
import ApiUserForAdmin from "../../api/admin/user.admin.api";

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
  yield takeLatest(getAllUser, getAllUserForAdminSaga);
  yield takeLatest(getUserDetail, getUserDetailForAdminSaga);
}

export default userForAdminSaga;
