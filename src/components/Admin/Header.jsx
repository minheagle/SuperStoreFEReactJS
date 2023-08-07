import { useSelector, useDispatch } from "react-redux";
import {
  toggleNavbar,
  toggleDropdownInfo,
} from "../../redux/slice/UIAdmin.slice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const dispatch = useDispatch();
  const isOpenDropdownInfo = useSelector(
    (state) => state.UIAdmin.dropdownInfo.isOpen
  );

  const handleToggleNavbar = () => {
    dispatch(toggleNavbar());
  };

  const handleToggleDropdownInfo = () => {
    dispatch(toggleDropdownInfo());
  };

  return (
    <div className="w-full h-12 flex justify-between items-center bg-white">
      <div className="flex justify-center items-center px-4">
        <button onClick={() => handleToggleNavbar()}>
          <FontAwesomeIcon
            icon="fas fa-bars"
            className="text-2xl text-slate-500"
          />
        </button>
      </div>
      <div className="w-1/3">
        <div className="w-full flex justify-center items-center border rounded">
          <FontAwesomeIcon
            icon="fas fa-search"
            className="w-1/12 px-2 text-slate-500"
          />
          <input type="text" className="w-9/12" />
          <div className="w-2/12 p-1">
            <button className="w-full bg-slate-500 text-white rounded">
              Search
            </button>
          </div>
        </div>
      </div>

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

        <button onClick={() => handleToggleDropdownInfo()} className="relative">
          <FontAwesomeIcon
            icon="fas fa-caret-down"
            className="text-2xl text-slate-500"
          />
          {isOpenDropdownInfo ? (
            <div className="absolute right-0 min-w-[100px] text-white bg-slate-500 mt-2">
              <ul className="flex flex-col justify-center items-start">
                <li className="w-full flex justify-start items-center pl-2 hover:bg-slate-800">
                  Info
                </li>
                <li className="w-full flex justify-start items-center pl-2 hover:bg-slate-800">
                  Log out
                </li>
              </ul>
            </div>
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;
