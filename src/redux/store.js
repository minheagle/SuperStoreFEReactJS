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
import productPublicSlice from "./slice/public/product.public.slice";
import shopPublicSlice from "./slice/public/shop.public.slice";
import cartSlice from "./slice/cart/cart.slice";
import searchFilterPagingSlice from "./slice/search_filter_paging/search.filter.paging.slice";

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
  ProductPublic: productPublicSlice,
  ShopPublic: shopPublicSlice,
  Cart: cartSlice,
  Filter: searchFilterPagingSlice,
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
