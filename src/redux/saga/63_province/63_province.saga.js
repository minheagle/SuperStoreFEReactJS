import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllProvince,
  getAllProvinceSuccess,
  getAllProvinceFailure,
  getProvinceDetail,
  getProvinceDetailSuccess,
  getProvinceDetailFailure,
  getDistrict,
  getDistrictSuccess,
  getDistrictFailure,
  getDistrictDetail,
  getDistrictDetailSuccess,
  getDistrictDetailFailure,
  getWard,
  getWardSuccess,
  getWardFailure,
  getWardDetail,
  getWardDetailSuccess,
  getWardDetailFailure,
  getDetailAddress,
  getDetailAddressSuccess,
  getDetailAddressFailure,
} from "../../slice/63_province/63_provinces.slice";

import provincesVietNamApi from "../../api/63_provinces/63_provinces.api";

function* getAllProvinceSaga() {
  try {
    const response = yield call(provincesVietNamApi.getAllProvince);
    yield put(getAllProvinceSuccess(response.results.data));
  } catch (error) {
    yield put(getAllProvinceFailure(error.message));
  }
}

function* getProvinceDetailSaga(action) {
  try {
    const { provinceName } = action.payload;
    const response = yield call(
      provincesVietNamApi.getProvinceByName,
      provinceName
    );
    yield put(getProvinceDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getProvinceDetailFailure(error));
  }
}

function* getAllDistrictByProvinceSaga(action) {
  try {
    const { provinceId } = action.payload;
    const response = yield call(
      provincesVietNamApi.getAllDistrictByProvince,
      provinceId
    );
    yield put(getDistrictSuccess(response.results.data));
  } catch (error) {
    yield put(getDistrictFailure(error.message));
  }
}

function* getDistrictDetailSaga(action) {
  try {
    const { provinceId, districtName } = action.payload;
    const response = yield call(
      provincesVietNamApi.getDistrictByName,
      districtName
    );
    yield put(getDistrictDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getDistrictDetailFailure(error));
  }
}

function* getAllWardByDistrictSaga(action) {
  try {
    const { districtId } = action.payload;
    const response = yield call(
      provincesVietNamApi.getAllWardByDistrict,
      districtId
    );
    yield put(getWardSuccess(response.results.data));
  } catch (error) {
    yield put(getWardFailure(error.message));
  }
}

function* getWardDetailSaga(action) {
  try {
    const { wardName } = action.payload;
    const response = yield call(provincesVietNamApi.getWardByName, wardName);
    yield put(getWardDetailSuccess(response.results.data));
  } catch (error) {
    yield put(getWardDetailFailure(error));
  }
}

function* getDetailAddressSaga(action) {
  try {
    const { detailAddress } = action.payload;
    const response = yield call(
      provincesVietNamApi.getDetailAddress,
      detailAddress
    );
    yield put(getDetailAddressSuccess(response.results.data));
  } catch (error) {
    yield put(getDetailAddressFailure(error));
  }
}

function* provinceVietNamSaga() {
  yield takeLatest(getAllProvince, getAllProvinceSaga);
  yield takeLatest(getProvinceDetail, getProvinceDetailSaga);
  yield takeLatest(getDistrict, getAllDistrictByProvinceSaga);
  yield takeLatest(getDistrictDetail, getDistrictDetailSaga);
  yield takeLatest(getWard, getAllWardByDistrictSaga);
  yield takeLatest(getWardDetail, getWardDetailSaga);
  yield takeLatest(getDetailAddress, getDetailAddressSaga);
}

export default provinceVietNamSaga;
