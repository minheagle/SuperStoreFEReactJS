import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import UIAdminReducer from "./slice/UIAdmin.slice";
import UIPublicSlice from "./slice/UIPublic.slice";
import userForAdminSlice from "./slice/admin/userForAdmin.slice";
import productForAdminSlice from "./slice/admin/product.slice";
import authSlice from "./slice/auth.slice";
import categorySlice from "./slice/admin/category.slice";
import userSlice from "./slice/user/user.slice";
import provinceVietNamSlice from "./slice/63_province/63_provinces.slice";
import categoryPublicSlice from "./slice/public/category.public.slice";
import productSellerSlice from "./slice/seller/product.seller.slice";

const rootReducer = {
  UIPublic: UIPublicSlice,
  UIAdmin: UIAdminReducer,
  UserForAdmin: userForAdminSlice,
  ProductForAdmin: productForAdminSlice,
  Auth: authSlice,
  Category: categorySlice,
  User: userSlice,
  ProvinceVietNam: provinceVietNamSlice,
  CategoryPublic: categoryPublicSlice,
  ProductSeller: productSellerSlice,
};

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

export default store;
