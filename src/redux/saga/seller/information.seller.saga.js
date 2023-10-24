import { put, call, takeLatest } from "redux-saga/effects";
import {
  getInformationDetail,
  getInformationDetailSuccess,
  getInformationDetailFailure,
  changeInformation,
  changeInformationSuccess,
  changeInformationFailure,
  changeAvatar,
  changeAvatarSuccess,
  changeAvatarFailure,
  changeBackground,
  changeBackgroundSuccess,
  changeBackgroundFailure,
} from "../../slice/seller/information.seller.slice";
import informationSellerApi from "../../api/seller/information/information.api";

function* getInformationDetailSaga(action) {
  try {
    const { sellerId } = action.payload;
    const response = yield call(informationSellerApi.getDetail, sellerId);
    yield put(getInformationDetailSuccess(response.results.data));
    yield localStorage.setItem(
      "shopData",
      JSON.stringify(response.results.data)
    );
  } catch (error) {
    yield put(getInformationDetailFailure(error.message));
  }
}

function* changeInformationSaga(action) {
  const { sellerRequestUpdate, callback, sellerId } = action.payload;
  try {
    const response = yield call(
      informationSellerApi.updateInformation,
      sellerRequestUpdate
    );
    yield put(changeInformationSuccess(response));
    const responseCallback = yield call(
      informationSellerApi.getDetail,
      sellerId
    );
    yield put(getInformationDetailSuccess(responseCallback.results.data));
    yield localStorage.setItem(
      "shopData",
      JSON.stringify(responseCallback.results.data)
    );
    yield callback.notification("Update information success !");
  } catch (error) {
    yield put(changeInformationFailure(error.message));
    yield callback.notification("Update information failure !");
  }
}

function* changeAvatarSaga(action) {
  try {
    const { sellerId, storeAvatar, callback } = action.payload;
    const response = yield call(
      informationSellerApi.changeAvatar,
      sellerId,
      storeAvatar
    );
    yield put(changeAvatarSuccess(response));
    const responseCallback = yield call(
      informationSellerApi.getDetail,
      sellerId
    );
    yield put(getInformationDetailSuccess(responseCallback.results.data));
    yield localStorage.setItem(
      "shopData",
      JSON.stringify(responseCallback.results.data)
    );
    yield callback.notification("Update avatar success !");
  } catch (error) {
    yield put(changeAvatarFailure(error.message));
  }
}

function* changeBackgroundSaga(action) {
  try {
    const { sellerId, storeBackground, callback } = action.payload;
    const response = yield call(
      informationSellerApi.changeBackground,
      sellerId,
      storeBackground
    );
    yield put(changeBackgroundSuccess(response));
    const responseCallback = yield call(
      informationSellerApi.getDetail,
      sellerId
    );
    yield put(getInformationDetailSuccess(responseCallback.results.data));
    yield localStorage.setItem(
      "shopData",
      JSON.stringify(responseCallback.results.data)
    );
    yield callback.notification("Update background success !");
  } catch (error) {
    yield put(changeBackgroundFailure(error.message));
  }
}

function* informationForSellerSaga() {
  yield takeLatest(getInformationDetail, getInformationDetailSaga);
  yield takeLatest(changeInformation, changeInformationSaga);
  yield takeLatest(changeAvatar, changeAvatarSaga);
  yield takeLatest(changeBackground, changeBackgroundSaga);
}

export default informationForSellerSaga;
