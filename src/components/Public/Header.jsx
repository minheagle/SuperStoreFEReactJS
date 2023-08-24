import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { toggleMenu } from "../../redux/slice/UIPublic.slice";
import { log_out } from "../../redux/slice/auth.slice";
import ROUTES from "../../constants/ROUTES";

const categories = [
  { id: 1, title: "Mobile" },
  { id: 2, title: "Tablet" },
  { id: 3, title: "Laptop" },
  { id: 2, title: "TV" },
];

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { menu, auth } = useSelector((state) => state.UIPublic);
  const { information, logout } = useSelector((state) => state.Auth);

  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  const handleLogout = () => {
    dispatch(
      log_out({
        data: information.data._id,
        callback: {
          goToLogin: () => navigate(ROUTES.PUBLIC.LOGIN),
        },
      })
    );
  };

  const handleRenderCategoryList = () => {
    return categories.map((item) => {
      return (
        <Link
          key={item.id}
          className="w-full text-slate-700 hover:text-white hover:bg-primary rounded"
        >
          <div className="flex justify-between items-center px-2">
            <span>{item.title}</span>
            <FontAwesomeIcon icon="fas fa-angle-right" className="text-xl" />
          </div>
        </Link>
      );
    });
  };

  return (
    <div className="w-full flex flex-col justify-start items-start bg-primary">
      <div className="w-full h-24 grid grid-cols-6">
        <div className="relative col-span-2 p-6 flex justify-center items-center">
          <div className="w-2/3 flex justify-center items-center">
            <Link
              to={ROUTES.PUBLIC.HOME}
              className="text-white text-3xl uppercase"
            >
              Super Store
            </Link>
          </div>
          <div className="w-1/3 flex justify-center items-center">
            <button onClick={() => handleToggleMenu()} className="h-8">
              <FontAwesomeIcon
                icon="fas fa-bars"
                className="text-2xl text-white"
              />
            </button>
            {menu.isOpen ? (
              <div className="absolute top-24 right-0 w-48 bg-slate-50 border-2 border-primary p-2 rounded">
                <div className="flex flex-col justify-start items-start gap-1">
                  {handleRenderCategoryList()}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="col-span-2 flex justify-start items-center">
          <div className="w-full flex justify-start items-center bg-white p-1 rounded">
            <FontAwesomeIcon
              icon="fas fa-search"
              className="w-1/12 text-2xl text-primary"
            />
            <input type="text" className="w-9/12" />
            <button className="w-2/12 text-center text-white bg-primary rounded">
              Search
            </button>
          </div>
        </div>
        <div className="col-span-2 flex justify-center items-center text-white">
          <div className="relative h-12 flex justify-end items-center gap-8">
            <button>
              <FontAwesomeIcon
                icon="fas fa-shopping-cart"
                className="text-2xl"
              />
            </button>
            <FontAwesomeIcon icon="fas fa-bell" className="text-2xl" />
            <div className="group inline-block relative">
              <button className="flex justify-center items-center gap-1">
                <FontAwesomeIcon icon="fas fa-user" className="text-2xl" />
                <FontAwesomeIcon
                  icon="fas fa-caret-down"
                  className="text-2xl"
                />
              </button>
              <div className="absolute hidden top-6 w-32 bg-slate-50 border-2 border-primary p-2 rounded group-hover:block">
                {information?.data ? (
                  information?.data?.role === "admin" ? (
                    <div className="flex flex-col justify-center items-start gap-2 rounded">
                      <Link
                        to={ROUTES.ADMIN.DASHBOARD}
                        className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded"
                      >
                        Dashboard
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
                      <Link className="w-full text-slate-700 hover:text-white hover:bg-primary pl-2 rounded">
                        Information
                      </Link>
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
      <div></div>
    </div>
  );
};

export default Header;
