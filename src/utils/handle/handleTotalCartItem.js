const getTotalCartItem = (data) => {
  let total = 0;
  data?.map((item) => {
    let totalItem = item?.lineItems?.length ?? 0;
    total += totalItem;
  });
  return total;
};

const cartHandle = { getTotalCartItem };

export default cartHandle;
