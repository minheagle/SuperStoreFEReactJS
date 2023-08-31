const ROUTES = {
  PUBLIC: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
  },
  USER: {
    ACCOUNT: "/customer/account",
    ACCOUNT_PROFILE: "/customer/account/profile",
    ACCOUNT_PAYMENT: "/customer/account/payment",
    ACCOUNT_ADDRESS: "/customer/account/address",
    ACCOUNT_CHANGE_PASSWORD: "/customer/account/change-password",
    ACCOUNT_SETTING_NOTIFICATION: "/customer/setting/notification",
    PURCHASE: "/customer/account/purchase",
    NOTIFICATION: "/customer/notification",
    NOTIFICATION_ORDER: "/customer/notification/order",
    NOTIFICATION_PROMOTION: "/customer/notification/promotion",
    NOTIFICATION_WALLET: "/customer/notification/wallet",
    VOUCHER_WALLET: "/customer/voucher-wallet",
  },
  EMPLOYEE: {},
  MANAGER: {},
  ADMIN: {
    DASHBOARD: "/admin/dashboard",
    CATEGORIES: {
      LIST: "/admin/categories",
      CREATE: "/admin/categories/create",
      DETAIL: "/admin/categories/:id",
      EDIT: "/admin/categories/:id/edit",
    },
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
