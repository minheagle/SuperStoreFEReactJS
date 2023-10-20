const ROUTES = {
  PUBLIC: {
    HOME: "/",
    PRODUCT_DETAIL: "/products/:productId",
    LOGIN: "/login",
    REGISTER: "/register",
  },
  SHOP: {
    HOME: "/shop/:shopName",
  },
  USER: {
    ACCOUNT: {
      PROFILE: "/customer/account",
      PAYMENT: "/customer/account/payment",
      ADDRESS: "/customer/account/address",
      ADDRESS_CREATE: "/customer/account/address/create",
      ADDRESS_UPDATE: "/customer/account/address/:addressId/update",
      CHANGE_PASSWORD: "/customer/account/change-password",
      SETTING_NOTIFICATION: "/customer/setting/notification",
    },
    CART: "/customer/cart",
    PURCHASE: "/customer/purchase",
    NOTIFICATION: "/customer/notification",
    NOTIFICATION_ORDER: "/customer/notification/order",
    NOTIFICATION_PROMOTION: "/customer/notification/promotion",
    NOTIFICATION_WALLET: "/customer/notification/wallet",
    VOUCHER_WALLET: {
      LIST: "/customer/voucher-wallet",
      AVAILABLE: "/customer/voucher-wallet/available",
    },
    BECOME_SELLER: "/customer/become-seller",
  },
  SELLER: {
    HOME_PAGE: {
      PAGE: "/seller/:shopName/home",
      EDIT_PAGE: "/seller/:shopName/home/edit",
    },
    PRODUCT: {
      LIST: "/seller/:shopName/products",
      CREATE: "/seller/:shopName/products/create",
      UPDATE: "/seller/:shopName/products/:productId",
      UPDATE_PRODUCT: "/seller/:shopName/products/:productId/update",
      UPDATE_PRODUCT_ITEMS:
        "/seller/:shopName/products/:productId/product-items/:productItemId/update",
    },
    ORDER: {
      LIST: "/seller/:shopName/orders",
    },
    VOUCHER: {
      LIST: "/seller/:shopName/vouchers",
      CREATE: "/seller/:shopName/vouchers/create",
    },
  },
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
      DETAIL: "/admin/users/:userName",
      EDIT: "/admin/users/:userName/edit",
    },
  },
};

export default ROUTES;
