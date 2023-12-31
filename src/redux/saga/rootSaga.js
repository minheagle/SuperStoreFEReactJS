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
import chatSaga from "./chat/chat.saga";
import voucherForSellerSaga from "./seller/voucher.seller.saga";
import voucherPublicSaga from "./public/voucher.public.saga";
import voucherUserSaga from "./user/voucher.user.saga";
import informationForSellerSaga from "./seller/information.seller.saga";
import productReviewForUserSaga from "./user/rating.user.saga";
import ratingPublicSaga from "./public/rating.public.saga";

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
    chatSaga(),
    voucherForSellerSaga(),
    voucherPublicSaga(),
    voucherUserSaga(),
    informationForSellerSaga(),
    productReviewForUserSaga(),
    ratingPublicSaga(),
  ]);
}

export default rootSaga;
