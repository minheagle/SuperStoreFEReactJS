const getAllOrderSameOrderNumber = (orderNumber, status, rawData = []) => {
  const data = rawData.filter((item) => item.orderNumber === orderNumber);
  return {
    orderNumber,
    status,
    data,
  };
};

const handleOrder = (rawData = []) => {
  const newData = [];
  rawData.forEach((order) => {
    const index = newData.findIndex(
      (item) => item.orderNumber === order.orderNumber
    );
    if (index === -1) {
      const newOrder = getAllOrderSameOrderNumber(
        order.orderNumber,
        order.status,
        rawData
      );
      newData.push(newOrder);
    }
  });

  return newData;
};

export default handleOrder;
