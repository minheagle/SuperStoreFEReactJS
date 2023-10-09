const getTotalCartItem = (data) => {
  let total = 0;
  data?.map((item) => {
    let totalItem = item?.lineItems?.length ?? 0;
    total += totalItem;
  });
  return total;
};

const handleCartCheckout = (data) => {
  return data?.flatMap((item) => {
    return item?.cartId?.map((cart) => cart);
  });
};

const handleTotalItemsAndTotalPrice = (data) => {
  let totalItems = 0;
  let totalPrice = 0;

  // Duyệt qua từng đơn hàng trong data
  for (const order of data) {
    // Duyệt qua từng sản phẩm trong lineItems của đơn hàng
    for (const lineItem of order.cartResponse.lineItems) {
      // Tính tổng số lượng sản phẩm
      totalItems++;

      // Tính tổng giá tiền cho sản phẩm này (sản phẩm * số lượng)
      const productPrice = lineItem.product.productItemResponse.price;
      totalPrice += productPrice * lineItem.quantity;
    }
  }

  return {
    totalItems,
    totalPrice,
  };
};

const cartHandle = {
  getTotalCartItem,
  handleCartCheckout,
  handleTotalItemsAndTotalPrice,
};

export default cartHandle;
