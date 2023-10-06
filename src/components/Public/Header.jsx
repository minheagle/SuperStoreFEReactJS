import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, generatePath } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import SearchAndFilter from "./SearchAndFilter";

import { log_out } from "../../redux/slice/auth.slice";
import { getCartList } from "../../redux/slice/cart/cart.slice";
import { changeProductName } from "../../redux/slice/search_filter_paging/search.filter.paging.slice";
import ROUTES from "../../constants/ROUTES";
import ROLES from "../../constants/ROLES";
import handleRoles from "../../utils/handle/handleRoles.js";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cart_list } = useSelector((state) => state.Cart);
  const accessToken = localStorage.getItem("accessToken");
  const userData = JSON.parse(localStorage.getItem("userData")) || null;
  const shopData = JSON.parse(localStorage.getItem("shopData")) || null;

  useEffect(() => {
    dispatch(
      getCartList({
        userId: userData.id,
      })
    );
  }, []);

  const handleShopName = () => {
    const shopName = shopData.storeName.replaceAll(" ", "-");
    return shopName;
  };

  const handleRenderCartPage = () => {
    if (!userData) {
      return navigate(ROUTES.PUBLIC.LOGIN);
    }
    return navigate(ROUTES.USER.CART);
  };

  const handleOnChangeProductName = (e) => {
    dispatch(changeProductName(e.target.value));
  };

  const handleLogout = () => {
    dispatch(
      log_out({
        callback: {
          goToLogin: () => navigate(ROUTES.PUBLIC.LOGIN),
        },
      })
    );
  };

  return (
    <div className="sticky top-0 right-0 left-0 w-full grid grid-cols-12 bg-primary z-40">
      <div className="col-span-1"></div>
      <div className="col-span-10">
        <div className="w-full grid grid-cols-6">
          <div className="col-span-6 h-6 flex justify-between items-center text-white">
            <div className="w-1/2 flex justify-start items-center gap-2">
              {accessToken &&
              !handleRoles.checkRole(ROLES.SELLER, userData?.roles) ? (
                <>
                  <Link
                    to={ROUTES.USER.BECOME_SELLER}
                    className="h-6 flex justify-center items-center"
                  >
                    Become seller
                  </Link>
                  <div className="h-6 flex justify-center items-center text-justify text-slate-300">
                    |
                  </div>
                </>
              ) : (
                ""
              )}
              <div className="h-6 flex justify-center items-center text-justify">
                Follow us on
              </div>
              <button>
                <i className="fab fa-facebook-square"></i>
              </button>
              <button>
                <i className="fab fa-tiktok"></i>
              </button>
              <button>
                <i className="fab fa-instagram"></i>
              </button>
            </div>
            <div className="w-1/2 flex justify-end items-center gap-2">
              {accessToken ? (
                <>
                  <div className="w-6 h-6 flex justify-center items-center bg-slate-300 rounded-full">
                    {userData?.avatar ? (
                      <img
                        src={userData?.avatar}
                        alt=""
                        className="object-cover w-6 h-6 rounded-full"
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon="fas fa-user"
                        className=" text-white"
                      />
                    )}
                  </div>
                  <span>{userData?.userName}</span>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="col-span-6 grid grid-cols-5">
            <div className="relative col-span-1 p-6 flex justify-center items-center">
              <div className="w-full flex justify-center items-center">
                <Link
                  to={ROUTES.PUBLIC.HOME}
                  className="text-white text-3xl uppercase"
                >
                  Super Store
                </Link>
              </div>
            </div>
            <div className="col-span-3 flex justify-start items-center">
              <div className="w-full flex justify-start items-center bg-white p-1 rounded">
                <FontAwesomeIcon
                  icon="fas fa-search"
                  className="w-1/12 text-2xl text-primary"
                />
                <input
                  type="text"
                  onChange={(e) => handleOnChangeProductName(e)}
                  className="w-9/12 outline-none"
                />
                <button className="w-2/12 text-center text-white bg-primary rounded">
                  Search
                </button>
              </div>
            </div>
            <div className="col-span-1 flex justify-end items-center text-white">
              <div className="relative h-12 flex justify-end items-center gap-8">
                {userData ? (
                  <button
                    onClick={() => handleRenderCartPage()}
                    className="relative w-12 h-12"
                  >
                    <FontAwesomeIcon
                      icon="fas fa-shopping-cart"
                      className="text-2xl"
                    />
                    <div className="absolute -top-3 -right-3 w-6 h-6 flex justify-center items-center bg-white text-primary font-medium rounded-full">
                      {cart_list.total}
                    </div>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRenderCartPage()}
                    className="w-12 h-12"
                  >
                    <FontAwesomeIcon
                      icon="fas fa-shopping-cart"
                      className="text-2xl"
                    />
                  </button>
                )}
                <FontAwesomeIcon icon="fas fa-bell" className="text-2xl" />
                <div className="group inline-block relative">
                  <button className="flex justify-center items-center gap-1">
                    <FontAwesomeIcon icon="fas fa-user" className="text-2xl" />
                    <FontAwesomeIcon
                      icon="fas fa-caret-down"
                      className="text-2xl"
                    />
                  </button>
                  <div className="absolute hidden top-6 w-32 bg-slate-50 border-2 border-primary p-2 rounded z-50 group-hover:block">
                    {accessToken ? (
                      handleRoles.checkRole("ROLE_ADMIN", userData?.roles) ? (
                        <div className="flex flex-col justify-center items-start gap-2 rounded">
                          <Link
                            to={ROUTES.ADMIN.DASHBOARD}
                            className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                          >
                            Dashboard
                          </Link>
                          <Link
                            to={ROUTES.USER.ACCOUNT_PROFILE}
                            className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                          >
                            Information
                          </Link>
                          <button
                            onClick={() => handleLogout()}
                            className="w-full text-left text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                          >
                            Logout
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col justify-center items-start gap-2 rounded">
                          <Link
                            to={ROUTES.USER.ACCOUNT_PROFILE}
                            className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                          >
                            Information
                          </Link>
                          {handleRoles.checkRole(
                            ROLES.SELLER,
                            userData?.roles
                          ) ? (
                            <Link
                              to={generatePath(ROUTES.SELLER.HOME_PAGE.PAGE, {
                                shopName: handleShopName(),
                              })}
                              className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                            >
                              Seller Page
                            </Link>
                          ) : (
                            ""
                          )}
                          <button
                            onClick={() => handleLogout()}
                            className="w-full text-left text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                          >
                            Logout
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="flex flex-col gap-2 rounded">
                        <Link
                          to={ROUTES.PUBLIC.LOGIN}
                          className="text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                        >
                          Login
                        </Link>
                        <Link
                          to={ROUTES.PUBLIC.REGISTER}
                          className="text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                        >
                          Register
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-6 h-12 grid grid-cols-7">
            <SearchAndFilter />
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>
      <div></div>
    </div>
  );
};

export default Header;
