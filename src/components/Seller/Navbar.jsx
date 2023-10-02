import { NavLink } from "react-router-dom";

import ROUTES from "../../constants/ROUTES";

const Navbar = () => {
  const navbarList = [
    { id: 1, title: "Home", icon: "", path: ROUTES.SELLER.HOME_PAGE.PAGE },
    {
      id: 2,
      title: "Product",
      icon: "",
      path: ROUTES.SELLER.PRODUCT.LIST,
      child: [
        { id: 1, title: "List", path: ROUTES.SELLER.PRODUCT.LIST },
        { id: 2, title: "Create", path: ROUTES.SELLER.PRODUCT.CREATE },
      ],
    },
    { id: 3, title: "Order", icon: "", path: ROUTES.SELLER.ORDER.LIST },
    { id: 4, title: "Voucher", icon: "", path: ROUTES.SELLER.VOUCHER.LIST },
  ];

  const styleActiveNavbar = "bg-primary text-white rounded";

  const handleRenderChildNavbar = (child) => {
    return child.map((item) => {
      return (
        <NavLink
          key={item.id}
          to={item.path}
          end
          className="w-full flex justify-start items-center hover:bg-primary hover:text-white hover:rounded"
        >
          {({ isActive }) => (
            <div
              className={`w-full flex justify-start items-center p-2 ${
                isActive ? styleActiveNavbar : ""
              }`}
            >
              {item.title}
            </div>
          )}
        </NavLink>
      );
    });
  };

  const handleRenderNavbar = () => {
    return navbarList.map((item) => {
      return (
        <div
          key={item.id}
          className="w-full flex flex-col justify-start items-center gap-2"
        >
          <NavLink
            to={item.path}
            className="group w-full flex justify-center items-center hover:bg-primary hover:text-white hover:rounded"
          >
            {({ isActive }) => (
              <div
                className={`w-full flex justify-start items-center gap-2 p-2 ${
                  isActive ? styleActiveNavbar : ""
                }`}
              >
                {item.icon ? (
                  <FontAwesomeIcon
                    icon={item.icon}
                    className={`text-xl text-primary group-hover:text-white ${
                      isActive ? "text-white" : ""
                    }`}
                  />
                ) : (
                  ""
                )}
                <span>{item.title}</span>
              </div>
            )}
          </NavLink>
          {item.child ? (
            <div className="w-full flex flex-col justify-start gap-2 pl-6">
              {handleRenderChildNavbar(item.child)}
            </div>
          ) : (
            ""
          )}
        </div>
      );
    });
  };
  return (
    <div className="w-full">
      <div className="w-full flex flex-col justify-start items-center gap-2 pr-2">
        {handleRenderNavbar()}
      </div>
    </div>
  );
};

export default Navbar;
