import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import ROUTES from "../../constants/ROUTES";
import { log_out } from "../../redux/slice/auth.slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isOpen = useSelector((state) => state.UIAdmin.navbar.isOpen);
  const { information, logout } = useSelector((state) => state.Auth);
  const categories = [
    { id: 1, title: "Dashboard", path: ROUTES.ADMIN.DASHBOARD },
    { id: 2, title: "Product", path: ROUTES.ADMIN.PRODUCTS.LIST },
    { id: 3, title: "User", path: ROUTES.ADMIN.USERS.LIST },
  ];

  const spanStyleActive = "bg-slate-600";

  const handleGoToSuperStore = () => {
    navigate(ROUTES.PUBLIC.HOME);
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

  return (
    <nav
      className={`sticky top-0 left-0 bottom-0 w-48 h-screen flex flex-col bg-slate-500 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="w-full h-12 flex justify-center items-center text-xl text-white text-center bg-slate-800">
        Admin Page
      </div>
      <div className="w-full h-full flex flex-col justify-between items-center">
        <ul className="w-full flex flex-col">
          {categories?.map((item) => {
            return (
              <NavLink
                key={item.id}
                to={item.path}
                end
                className="w-full h-10 pt-1 text-white hover:bg-slate-600"
              >
                {({ isActive }) => (
                  <li
                    className={`w-full h-full pl-2 flex justify-start items-center ${
                      isActive ? spanStyleActive : ""
                    }`}
                  >
                    {item.title}
                  </li>
                )}
              </NavLink>
            );
          })}
        </ul>
        <div className="w-full flex flex-col justify-start items-start gap-2">
          <button
            onClick={() => handleGoToSuperStore()}
            className="w-full h-10 text-white text-left pl-2 hover:bg-slate-600"
          >
            Super Store
          </button>
          <button
            onClick={() => handleLogout()}
            className="w-full h-10 text-white text-left pl-2 hover:bg-slate-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
