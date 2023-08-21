import Cookies from "js-cookie";
import { takeLatest, call, put } from "redux-saga/effects";
import {
  getUser,
  getUserSuccess,
  getUserFailure,
  register,
  registerSuccess,
  registerFailure,
  login,
  loginSuccess,
  loginFailure,
  log_out,
  logoutSuccess,
  logoutFailure,
} from "../../slice/auth.slice.js";
import authApi from "../../api/public/auth.public.api.js";

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield call(authApi.register, data);
    yield put(registerSuccess());
    yield callback.goToLogin();
  } catch (error) {
    yield put(registerFailure(error.message));
  }
}

function* loginSaga(action) {
  try {
    const { data, callback } = action.payload;
    const response = yield call(authApi.login, data);
    yield localStorage.setItem(
      "accessToken",
      JSON.stringify(response.accessToken)
    );
    // yield Cookies.set("refreshToken", response.refreshToken);
    yield put(loginSuccess(response.data));
    if (response.data.role === "admin") {
      yield callback.goToAdmin();
    } else {
      yield callback.goToHome();
    }
  } catch (error) {
    yield put(loginFailure(error.message));
  }
}

function* logoutSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield call(authApi.logout, data);
    yield localStorage.removeItem("accessToken");
    yield put(logoutSuccess());
    yield callback.goToLogin();
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* getUserInfoSaga(action) {
  try {
    const response = yield call(authApi.getUserInfo, action.payload);
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(register, registerSaga);
  yield takeLatest(login, loginSaga);
  yield takeLatest(log_out, logoutSaga);
  yield takeLatest(getUser, getUserInfoSaga);
}

export default authSaga;
