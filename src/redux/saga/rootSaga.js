import { all } from "redux-saga/effects";
import userForAdminSaga from "./admin/user.admin.saga";
import productForAdminSaga from "./admin/product.admin.saga";
import authSaga from "./public/auth.public.saga";
import categorySaga from "./admin/category.admin.saga";
import userSaga from "./user/user.saga";
import provinceVietNamSaga from "./63_province/63_province.saga";
import categoryPublicSaga from "./public/category.public.saga";
import productForSellerSaga from "./seller/product.seller.saga";
import productPublicSaga from "./public/product.public.saga";
import cartSaga from "./cart/cart.saga";
import shopPublicSaga from "./public/shop.public.saga";
import orderForSellerSaga from "./seller/order.seller.saga";
import orderForUserSaga from "./user/order.user.saga";
import questionAndAnswerSaga from "./Q&A/question.and.answer.saga";

function* rootSaga() {
  yield all([
    userForAdminSaga(),
    productForAdminSaga(),
    authSaga(),
    categorySaga(),
    userSaga(),
    provinceVietNamSaga(),
    categoryPublicSaga(),
    productForSellerSaga(),
    productPublicSaga(),
    cartSaga(),
    shopPublicSaga(),
    orderForSellerSaga(),
    orderForUserSaga(),
    questionAndAnswerSaga(),
  ]);
}

export default rootSaga;
