import { takeLatest, call, put } from "redux-saga/effects";
import {
  getAllCategory,
  getAllCategorySuccess,
  getAllCategoryFailure,
  getDetailCategory,
  getDetailCategorySuccess,
  getDetailCategoryFailure,
  createCategory,
  createCategorySuccess,
  createCategoryFailure,
  updateCategory,
  updateCategorySuccess,
  updateCategoryFailure,
  deleteCategory,
  deleteCategorySuccess,
  deleteCategoryFailure,
  moveCategory,
  moveCategorySuccess,
  moveCategoryFailure,
} from "../../slice/admin/category.slice";
import categoryApi from "../../api/admin/category.admin.api";
import apiCategoryForAdmin from "../../api/admin/category.admin.api";

function* getAllCategorySaga() {
  try {
    const listAllCategory = yield call(categoryApi.getAllCategory);
    yield put(getAllCategorySuccess(listAllCategory));
  } catch (error) {
    yield put(getAllCategoryFailure(error.message));
  }
}

function* getDetailCategorySaga(action) {
  try {
    const detailCategory = yield call(
      categoryApi.getDetailCategory,
      action.payload
    );
    yield put(getDetailCategorySuccess(detailCategory));
  } catch (error) {
    yield put(getDetailCategoryFailure(error.message));
  }
}

function* createCategorySaga(action) {
  try {
    const { data, callback } = action.payload;
    const createCategory = yield call(categoryApi.createCategory, data);
    yield put(createCategorySuccess(createCategory));
    yield callback.goToList();
  } catch (error) {
    yield put(createCategoryFailure(error.message));
  }
}

function* updateCategorySaga(action) {
  try {
    const { data, categoryId, hasImage, callback } = action.payload;
    if (hasImage) {
      const response = yield call(
        categoryApi.updateCategoryChangeImage,
        data,
        categoryId
      );
      yield put(updateCategorySuccess(response));
      yield callback.goToList();
    } else {
      const response = yield call(
        categoryApi.updateCategoryNoChangeImage,
        data,
        categoryId
      );
      yield put(updateCategorySuccess(response));
      yield callback.goToList();
    }
  } catch (error) {
    yield put(updateCategoryFailure(error.message));
  }
}

function* deleteCategorySaga(action) {
  try {
    const { data, callback } = action.payload;
    const deleteCategory = yield call(categoryApi.deleteCategory, data);
    yield put(deleteCategorySuccess(deleteCategory));
    yield callback.refreshPage();
  } catch (error) {
    yield put(deleteCategoryFailure(error.message));
  }
}

function* moveCategorySaga(action) {
  try {
    const { data, callback } = action.payload;
    const moveCategoryResult = yield call(categoryApi.moveCategory, data);
    yield put(moveCategorySuccess(moveCategoryResult));
    yield callback.goToList();
  } catch (error) {
    yield put(moveCategoryFailure(error.message));
  }
}

function* categorySaga() {
  yield takeLatest(getAllCategory, getAllCategorySaga);
  yield takeLatest(getDetailCategory, getDetailCategorySaga);
  yield takeLatest(createCategory, createCategorySaga);
  yield takeLatest(updateCategory, updateCategorySaga);
  yield takeLatest(deleteCategory, deleteCategorySaga);
  yield takeLatest(moveCategory, moveCategorySaga);
}

export default categorySaga;
