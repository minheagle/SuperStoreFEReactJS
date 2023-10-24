import { takeLatest, call, put } from "redux-saga/effects";
import {
  updateUser,
  updateUserSuccess,
  updateUserFailure,
  changeAvatar,
  changeAvatarSuccess,
  changeAvatarFailure,
  addAddress,
  addAddressSuccess,
  addAddressFailure,
  updateAddress,
  updateAddressSuccess,
  updateAddressFailure,
  changePassword,
  changePasswordSuccess,
  changePasswordFailure,
  becomeSeller,
  becomeSellerSuccess,
  becomeSellerFailure,
} from "../../slice/user/user.slice.js";
import { getUserSuccess } from "../../slice/auth.slice.js";
import userApi from "../../api/user/user.api.js";

function* updateUserSaga(action) {
  try {
    const { updateUserForm, userId, callback } = action.payload;
    const response = yield call(userApi.updateUser, updateUserForm, userId);
    yield put(updateUserSuccess());
    yield localStorage.setItem("userData", JSON.stringify(response));
    yield callback.notification("Update information success !");
  } catch (error) {
    yield put(updateUserFailure(error));
  }
}

function* changeAvatarSaga(action) {
  try {
    const { changeAvatar, userId, callback } = action.payload;
    const response = yield call(userApi.changeAvatar, changeAvatar, userId);
    yield put(changeAvatarSuccess(response.results.data));
    yield localStorage.setItem(
      "userData",
      JSON.stringify(response.results.data)
    );
    yield callback.notification("Update avatar success !");
    yield callback.refresh();
  } catch (error) {
    yield put(changeAvatarFailure(error.message));
  }
}

function* addAddressSaga(action) {
  try {
    const { addressString, userId, callback } = action.payload;
    const response = yield call(userApi.addAddress, addressString, userId);
    yield put(addAddressSuccess(response.message));
    yield put(getUserSuccess(response.results));
    yield localStorage.setItem("userData", JSON.stringify(response.results));
    yield callback.notification("Add address success !");
    yield callback.goToAddress();
  } catch (error) {
    yield put(addAddressFailure(error.message));
  }
}

function* updateAddressSaga(action) {
  try {
    const { addressUpdate, addressId, callback } = action.payload;
    const response = yield call(
      userApi.updateAddress,
      addressUpdate,
      addressId
    );
    yield put(updateAddressSuccess(response.message));
    yield callback.goToAddress();
  } catch (error) {
    yield put(updateAddressFailure(error.message));
  }
}

function* changePasswordSaga(action) {
  try {
    const { changePasswordForm, userId, callback } = action.payload;
    const response = yield call(
      userApi.changePassword,
      changePasswordForm,
      userId
    );
    yield put(changePasswordSuccess(response.message));
    yield callback.goToLogin();
  } catch (error) {
    yield put(changePasswordFailure(error.message));
  }
}

function* becomeSellerSaga(action) {
  try {
    const { registerSeller, userId, callback } = action.payload;
    const response = yield call(userApi.registerSeller, registerSeller, userId);
    yield localStorage.setItem("userData", JSON.stringify(response.data));
    yield localStorage.setItem("shopData", JSON.stringify(response.shopData));
    yield put(becomeSellerSuccess());
    yield callback.goToSellerPage(response.shopData.storeName);
  } catch (error) {
    yield put(becomeSellerFailure(error));
  }
}

function* userSaga() {
  yield takeLatest(updateUser, updateUserSaga);
  yield takeLatest(changeAvatar, changeAvatarSaga);
  yield takeLatest(addAddress, addAddressSaga);
  yield takeLatest(updateAddress, updateAddressSaga);
  yield takeLatest(changePassword, changePasswordSaga);
  yield takeLatest(becomeSeller, becomeSellerSaga);
}

export default userSaga;
