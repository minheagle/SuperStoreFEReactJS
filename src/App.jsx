import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import "./fontawesome.js";

import { getUser } from "./redux/slice/auth.slice.js";

// For Public
import Public from "./layouts/Public.jsx";
import Home from "./pages/Public/Home.jsx";
import ProductDetail from "./pages/Public/product/ProductDetail.jsx";
import LoginPage from "./pages/Public/auth/LoginPage.jsx";
import Register from "./pages/Public/auth/Register.jsx";

// For Shop
import Shop from "./layouts/Shop.jsx";
import HomeShop from "./pages/Shop/home/HomeShop.jsx";

// For User
import User from "./layouts/User.jsx";
import Profile from "./pages/User/Profile.jsx";
import Address from "./pages/User/address/Address.jsx";
import CreateAddress from "./pages/User/address/Create.jsx";
import UpdateAddress from "./pages/User/address/Update.jsx";
import ChangePassword from "./pages/User/ChangePassword.jsx";
import BecomeSeller from "./pages/User/BecomeSeller.jsx";
import Cart from "./pages/User/Cart.jsx";
import OrdersForUser from "./pages/User/Orders.jsx";
import VoucherForUser from "./pages/User/Vouchers.jsx";
import ClaimVoucher from "./pages/User/voucher/ClaimVoucher.jsx";

// For Seller
import Seller from "./layouts/Seller.jsx";
import HomeSeller from "./pages/Seller/home/HomeSeller.jsx";
import ProductForSeller from "./pages/Seller/product/Products.jsx";
import CreateProductForSeller from "./pages/Seller/product/Create.jsx";
import EditPageForSeller from "./pages/Seller/product/Edit.jsx";
import EditProduct from "./pages/Seller/product/EditProduct.jsx";
import EditProductItem from "./pages/Seller/product/EditProductItem.jsx";
import OrdersForSeller from "./pages/Seller/order/Orders.jsx";
import VouchersForSeller from "./pages/Seller/voucher/Vouchers.jsx";
import CreateVoucher from "./pages/Seller/voucher/CreateVoucher.jsx";

// For Admin
import Admin from "./layouts/Admin.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Categories from "./pages/Admin/category/Categories.jsx";
import DetailCategory from "./pages/Admin/category/DetailCategory.jsx";
import CreateCategory from "./pages/Admin/category/CreateCategory.jsx";
import EditCategory from "./pages/Admin/category/EditCategory.jsx";
import Products from "./pages/Admin/product/Products.jsx";
import CreateProduct from "./pages/Admin/product/CreateProduct.jsx";
import Users from "./pages/Admin/user/Users.jsx";
import CreateUser from "./pages/Admin/user/CreateUser.jsx";
import UserDetail from "./pages/Admin/user/DetailUser.jsx";
import EditUser from "./pages/Admin/user/EditUser.jsx";

import ROUTES from "./constants/ROUTES.js";

function App() {
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    if (accessToken) {
      const decodeJWT = jwtDecode(accessToken);
      dispatch(getUser(decodeJWT.sub));
    }
  }, [accessToken]);

  return (
    <>
      <Routes>
        <Route element={<Public />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
          <Route
            path={ROUTES.PUBLIC.PRODUCT_DETAIL}
            element={<ProductDetail />}
          />
          <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
          <Route path={ROUTES.USER.BECOME_SELLER} element={<BecomeSeller />} />
        </Route>
        <Route element={<Shop />}>
          <Route path={ROUTES.SHOP.HOME} element={<HomeShop />} />
        </Route>
        <Route element={<User />}>
          <Route path={ROUTES.USER.ACCOUNT.PROFILE} element={<Profile />} />
          <Route path={ROUTES.USER.ACCOUNT.ADDRESS} element={<Address />} />
          <Route
            path={ROUTES.USER.ACCOUNT.ADDRESS_CREATE}
            element={<CreateAddress />}
          />
          <Route
            path={ROUTES.USER.ACCOUNT.ADDRESS_UPDATE}
            element={<UpdateAddress />}
          />
          <Route
            path={ROUTES.USER.ACCOUNT.CHANGE_PASSWORD}
            element={<ChangePassword />}
          />
          <Route path={ROUTES.USER.CART} element={<Cart />} />
          <Route path={ROUTES.USER.PURCHASE} element={<OrdersForUser />} />
          <Route
            path={ROUTES.USER.VOUCHER_WALLET.LIST}
            element={<VoucherForUser />}
          />
          <Route
            path={ROUTES.USER.VOUCHER_WALLET.AVAILABLE}
            element={<ClaimVoucher />}
          />
        </Route>
        <Route element={<Seller />}>
          <Route path={ROUTES.SELLER.HOME_PAGE.PAGE} element={<HomeSeller />} />
          <Route
            path={ROUTES.SELLER.PRODUCT.LIST}
            element={<ProductForSeller />}
          />
          <Route
            path={ROUTES.SELLER.PRODUCT.CREATE}
            element={<CreateProductForSeller />}
          />
          <Route
            path={ROUTES.SELLER.PRODUCT.UPDATE}
            element={<EditPageForSeller />}
          />
          <Route
            path={ROUTES.SELLER.PRODUCT.UPDATE_PRODUCT}
            element={<EditProduct />}
          />
          <Route
            path={ROUTES.SELLER.PRODUCT.UPDATE_PRODUCT_ITEMS}
            element={<EditProductItem />}
          />
          <Route
            path={ROUTES.SELLER.ORDER.LIST}
            element={<OrdersForSeller />}
          />
          <Route
            path={ROUTES.SELLER.VOUCHER.LIST}
            element={<VouchersForSeller />}
          />
          <Route
            path={ROUTES.SELLER.VOUCHER.CREATE}
            element={<CreateVoucher />}
          />
        </Route>
        <Route element={<Admin />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
          {/* Category Management */}
          <Route path={ROUTES.ADMIN.CATEGORIES.LIST} element={<Categories />} />
          <Route
            path={ROUTES.ADMIN.CATEGORIES.DETAIL}
            element={<DetailCategory />}
          />
          <Route
            path={ROUTES.ADMIN.CATEGORIES.CREATE}
            element={<CreateCategory />}
          />
          <Route
            path={ROUTES.ADMIN.CATEGORIES.EDIT}
            element={<EditCategory />}
          />
          {/* Product Management */}
          <Route path={ROUTES.ADMIN.PRODUCTS.LIST} element={<Products />} />
          <Route
            path={ROUTES.ADMIN.PRODUCTS.CREATE}
            element={<CreateProduct />}
          />
          {/* User Management */}
          <Route path={ROUTES.ADMIN.USERS.LIST} element={<Users />} />
          <Route path={ROUTES.ADMIN.USERS.CREATE} element={<CreateUser />} />
          <Route path={ROUTES.ADMIN.USERS.DETAIL} element={<UserDetail />} />
          <Route path={ROUTES.ADMIN.USERS.EDIT} element={<EditUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
