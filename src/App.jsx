import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import jwtDecode from "jwt-decode";
import "./fontawesome.js";

import { getUser } from "./redux/slice/auth.slice.js";

import Public from "./layouts/Public.jsx";
import Home from "./pages/Public/Home.jsx";
import LoginPage from "./pages/Public/auth/LoginPage.jsx";
import Register from "./pages/Public/auth/Register.jsx";

import User from "./layouts/User.jsx";
import Profile from "./pages/User/Profile.jsx";

import Admin from "./layouts/Admin.jsx";
import Dashboard from "./pages/Admin/Dashboard.jsx";
import Categories from "./pages/Admin/category/Categories.jsx";
import CreateCategory from "./pages/Admin/category/CreateCategory.jsx";
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
      dispatch(getUser(decodeJWT._id));
    }
  }, [accessToken]);

  return (
    <>
      <Routes>
        <Route element={<Public />}>
          <Route path={ROUTES.PUBLIC.HOME} element={<Home />} />
          <Route path={ROUTES.PUBLIC.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.PUBLIC.REGISTER} element={<Register />} />
        </Route>
        <Route element={<User />}>
          <Route path={ROUTES.USER.ACCOUNT_PROFILE} element={<Profile />} />
        </Route>
        <Route element={<Admin />}>
          <Route path={ROUTES.ADMIN.DASHBOARD} element={<Dashboard />} />
          {/* Category Management */}
          <Route path={ROUTES.ADMIN.CATEGORIES.LIST} element={<Categories />} />
          <Route
            path={ROUTES.ADMIN.CATEGORIES.CREATE}
            element={<CreateCategory />}
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
