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
    PRODUCTS: {
      LIST: "/admin/products",
      CREATE: "/admin/products/create",
      DETAIL: "/admin/products/:id",
      EDIT: "/admin/products/:id/edit",
    },
    USERS: {
      LIST: "/admin/users",
      CREATE: "/admin/users/create",
      DETAIL: "/admin/users/:id",
      EDIT: "/admin/users/:id/edit",
    },
  },
};

export default ROUTES;
