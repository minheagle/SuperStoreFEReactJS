const checkValueCreateProduct = (value) => {
  let hasError = false;
  if (!value.sellerId) {
    hasError = true;
  }
  if (!value.categoryId) {
    hasError = true;
  }
  if (!value.productName) {
    hasError = true;
  }
  if (!value.description) {
    hasError = true;
  }

  return hasError;
};

const checkValueCreateProductItem = (value) => {
  let hasError = false;
  if (value.length === 0) {
    hasError = true;
  }
  return hasError;
};

const handleErrorProduct = {
  checkValueCreateProduct,
  checkValueCreateProductItem,
};

export default handleErrorProduct;
