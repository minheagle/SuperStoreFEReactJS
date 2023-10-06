import Cookies from "js-cookie";
import { takeLatest, takeEvery, call, put } from "redux-saga/effects";
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
import roleHelper from "../../../utils/handle/handleRoles.js";

function* registerSaga(action) {
  try {
    const { data, callback } = action.payload;
    yield call(authApi.register, data);
    yield put(registerSuccess());
    yield callback.goToLogin();
  } catch (error) {
    yield put(registerFailure(error));
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
    yield localStorage.setItem("userData", JSON.stringify(response.data));
    if (response.shopData) {
      yield localStorage.setItem("shopData", JSON.stringify(response.shopData));
    }
    // yield Cookies.set("refreshToken", response.refreshToken);
    yield put(loginSuccess(response.data));
    if (roleHelper.checkRole("ROLE_ADMIN", response.data.roles)) {
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
    const { callback } = action.payload;
    yield call(authApi.logout);
    yield localStorage.clear();
    yield put(logoutSuccess());
    yield callback.goToLogin();
  } catch (error) {
    yield put(logoutFailure(error.message));
  }
}

function* getUserInfoSaga(action) {
  try {
    const response = yield call(authApi.getUserInfo, action.payload);
    yield localStorage.setItem("userData", JSON.stringify(response.data));
    yield localStorage.setItem("shopData", JSON.stringify(response.shopData));
    yield put(getUserSuccess(response.data));
  } catch (error) {
    yield put(getUserFailure(error.message));
  }
}

function* authSaga() {
  yield takeLatest(register, registerSaga);
  yield takeLatest(login, loginSaga);
  yield takeLatest(log_out, logoutSaga);
  yield takeEvery(getUser, getUserInfoSaga);
}

export default authSaga;
