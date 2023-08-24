const createProductFormError = {
  productName: "",
  category: "",
  basePrice: "",
  options: "",
  images: "",
  descriptions: "",
};

export const validateProductName = (productNameForm) => {
  console.log(productNameForm);
  const productName = productNameForm.trim();
  let productNameError = "";
  if (!productName.length || !productNameForm) {
    productNameError = "Product Name is required !";
  }
  if (productName.length > 255) {
    productNameError = "Product Name is less 255 char !";
  }
  return productNameError;
};

const validateCategory = (createProductForm) => {
  const category = createProductForm.category;
  //   console.log(!category);
  if (!category) {
    return (createProductFormError.category = "Category is required !");
  }
  return (createProductFormError.category = "");
};

const validateBasePrice = (createProductForm) => {
  const basePrice = createProductForm.basePrice;
  if (!basePrice) {
    return (createProductFormError.basePrice = "Base Price is required !");
  }
  return (createProductFormError.basePrice = "");
};

const validateOptions = (createProductForm) => {
  const options = createProductForm.options;
  if (options.length === 0) {
    return (createProductFormError.options = "Option is required !");
  }
  return (createProductFormError.options = "");
};

const validateDescriptions = (createProductForm) => {
  const descriptions = createProductForm.descriptions;
  if (!descriptions) {
    return (createProductFormError.descriptions = "Descriptions is required !");
  }
  return (createProductFormError.descriptions = "");
};

export const validateImages = (createProductForm) => {
  const images = createProductForm.images;
  // console.log(images.length === 0);
  if (images.length === 0) {
    return (createProductFormError.images = "Image is required !");
  }
  validateImage(images);
  return (createProductFormError.images = "");
};

const validateImage = (images) => {
  let hasError = false;
  images.forEach((item) => {
    if (item.size > 5 * 1024 * 1024 && !checkType()) {
      return (hasError = true);
    }
  });
  if (hasError) {
    return (createProductFormError.images = "Image is invalid !");
  }
  return (createProductFormError.images = "");
};

const checkType = (image) => {
  const listTypeValid = ["image/png", "image/jpeg", "image/jpg"];
  let isValid = false;
  listTypeValid.forEach((item) => {
    if (image.type === item) {
      return (isValid = true);
    }
  });
  return isValid;
};

export const checkError = (createProductFormError) => {
  if (createProductFormError.productName) {
    return false;
  }
  if (createProductFormError.basePrice) {
    return false;
  }
  if (createProductFormError.category) {
    return false;
  }
  if (createProductFormError.options) {
    return false;
  }
  if (createProductFormError.images) {
    return false;
  }
  if (createProductFormError.descriptions) {
    return false;
  }
  return true;
};

export const checkValueCreateProductForm = (createProductForm) => {
  if (!createProductForm.productName) {
    return false;
  }
  if (!createProductForm.basePrice) {
    return false;
  }
  if (!createProductForm.category) {
    return false;
  }
  if (!createProductForm.options) {
    return false;
  }
  if (createProductForm.images.length === 0) {
    return false;
  }
  if (!createProductForm.descriptions) {
    return false;
  }
  return true;
};

const validates = [
  validateProductName,
  validateCategory,
  validateBasePrice,
  validateDescriptions,
];

const validator = (createProductForm) => {
  validates.forEach((item) => item(createProductForm));
  return createProductFormError;
};

export default validator;
