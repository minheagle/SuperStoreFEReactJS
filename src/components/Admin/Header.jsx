import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import ROUTES from "../../constants/ROUTES";
import { log_out } from "../../redux/slice/auth.slice";
import { toggleNavbar } from "../../redux/slice/UIAdmin.slice";

import BreadCum from "./Breadcum";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { information, logout } = useSelector((state) => state.Auth);

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
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
    <div className="sticky top-0 right-0 w-full flex flex-col z-30">
      <div className="w-full h-12 flex justify-between items-center bg-white">
        <div className="flex justify-center items-center px-4">
          <button onClick={() => handleToggleNavbar()}>
            <FontAwesomeIcon
              icon="fas fa-bars"
              className="text-2xl text-slate-500"
            />
          </button>
        </div>
        <div className="w-1/3"></div>

        <div className="flex gap-4 justify-center items-center px-4">
          <FontAwesomeIcon
            icon="fas fa-bell"
            className="text-2xl text-slate-500"
          />
          <FontAwesomeIcon
            icon="fas fa-envelope"
            className="text-2xl text-slate-500"
          />
          <div className="w-6 h-6 flex justify-center items-center border border-slate-500 rounded-full object-cover">
            <FontAwesomeIcon icon="fas fa-user" className="text-slate-500" />
          </div>

          <button className="group relative">
            <FontAwesomeIcon
              icon="fas fa-caret-down"
              className="text-2xl text-slate-500"
            />
            <div className="absolute hidden top-6 right-0 min-w-[120px] text-white p-2 group-hover:block">
              <div className="w-full flex justify-center items-center p-2 bg-slate-500 rounded">
                <ul className="w-full flex flex-col justify-center items-start">
                  <li className="w-full flex justify-start items-center pl-2 rounded hover:bg-slate-600">
                    <Link to={ROUTES.USER.ACCOUNT_PROFILE}>
                    Info

                    </Link>
                  </li>
                  <li
                    onClick={() => handleLogout()}
                    className="w-full flex justify-start items-center pl-2 rounded hover:bg-slate-600"
                  >
                    Log out
                  </li>
                </ul>
              </div>
            </div>
          </button>
        </div>
      </div>
      <BreadCum />
    </div>
  );
};

export default Header;
