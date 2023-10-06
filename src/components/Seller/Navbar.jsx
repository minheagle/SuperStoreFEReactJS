import { NavLink, generatePath } from "react-router-dom";

import ROUTES from "../../constants/ROUTES";

const Navbar = () => {
  const shopData = localStorage.getItem("shopData")
    ? JSON.parse(localStorage.getItem("shopData"))
    : null;

  const shopName = shopData?.storeName?.replaceAll(" ", "-");

  const navbarList = [
    {
      id: 1,
      title: "Home",
      icon: "",
      path: generatePath(ROUTES.SELLER.HOME_PAGE.PAGE, {
        shopName,
      }),
    },
    {
      id: 2,
      title: "Product",
      icon: "",
      path: generatePath(ROUTES.SELLER.PRODUCT.LIST, { shopName }),
      child: [
        {
          id: 1,
          title: "List",
          path: generatePath(ROUTES.SELLER.PRODUCT.LIST, { shopName }),
        },
        {
          id: 2,
          title: "Create",
          path: generatePath(ROUTES.SELLER.PRODUCT.CREATE, { shopName }),
        },
      ],
    },
    {
      id: 3,
      title: "Order",
      icon: "",
      path: generatePath(ROUTES.SELLER.ORDER.LIST, { shopName }),
    },
    {
      id: 4,
      title: "Voucher",
      icon: "",
      path: generatePath(ROUTES.SELLER.VOUCHER.LIST, { shopName }),
    },
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
