import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";
import UIAdminReducer from "./slice/UIAdmin.slice";
import UIPublicSlice from "./slice/UIPublic.slice";
import userForAdminSlice from "./slice/userForAdmin.slice";
import productForAdminSlice from "./slice/admin/product.slice";
import authSlice from "./slice/auth.slice";

const rootReducer = {
  UIPublic: UIPublicSlice,
  UIAdmin: UIAdminReducer,
  UserForAdmin: userForAdminSlice,
  ProductForAdmin: productForAdminSlice,
  Auth: authSlice,
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
