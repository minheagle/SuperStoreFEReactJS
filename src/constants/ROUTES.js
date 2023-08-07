const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
  },
  USER: {},
  EMPLOYEE: {},
  MANAGER: {},
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    PRODUCTS: "/admin/products",
    USERS: {
      LIST: "/admin/users",
      DETAIL: "/admin/users/:id",
      EDIT: "/admin/users/:id/edit",
    },
  },
};

export default ROUTES;
