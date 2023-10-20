import axios from "../../axiosInstance.js";

const getAll = async (shopId) => {
  try {
    const response = await axios.get(`products/${shopId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailProduct = async (productId) => {
  try {
    const response = await axios.get(`products/product/${productId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const getDetailProductItem = async (productId, productItemId) => {
  try {
    const response = await axios.get(
      `/products/product/${productId}/item/${productItemId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProduct = async (product) => {
  try {
    const response = await axios.post("/products/add-new/product", product);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProductItemOptions = async (productItemId, options) => {
  try {
    const response = await axios.post("/products/add-new/option-by-item", {
      productItemId,
      optionTypeRequestList: options,
    });
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const createProductItem = async (productItem, productId) => {
  try {
    const response = await Promise.all(
      productItem.map(async (item) => {
        const { optionTypeRequestList } = item;
        if (optionTypeRequestList) {
          const options = optionTypeRequestList?.map((item) => {
            return {
              optionName: item.optionName,
              optionValueRequest: {
                valueName: item.optionValueRequest,
              },
            };
          });
          const formData = new FormData();
          formData.append("price", item.price);
          formData.append("qtyInStock", item.qtyInStock);
          item?.imgProductFile?.forEach((file, index) => {
            formData.append(`imgProductFile[${index}]`, file);
          });
          formData.append("productId", productId);
          const result = await axios.post(
            "/products/add-new/pitem-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
              method: "post",
              timeout: 60 * 1000,
            }
          );
          if (options?.length !== 0) {
            await createProductItemOptions(
              result.results.data.pitemId,
              options
            );
          }
          return result;
        }
      })
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const confirmCreate = async (productId) => {
  try {
    const response = await axios.get(
      `/products/confirm-finish-create/${productId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProduct = async (productId, updateProductForm) => {
  try {
    const response = await axios.put(
      `/products/product/update/${productId}`,
      updateProductForm
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateProductItem = async (productItemId, itemRequestEdit) => {
  try {
    const response = await axios.put(
      `/products/product/update-item/${productItemId}`,
      itemRequestEdit
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changeImageForProductItem = async (changeImageProductItem) => {
  try {
    const response = await axios.put(
      "/products/product/image-product-item",
      changeImageProductItem,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 60 * 1000,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`/products/product/${productId}`);
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteProductItem = async (productId, productItemId) => {
  try {
    const response = await axios.delete(
      `/products/product/${productId}/item/${productItemId}`
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const productForSellerApi = {
  getAll,
  getDetailProduct,
  getDetailProductItem,
  createProduct,
  createProductItem,
  confirmCreate,
  updateProduct,
  updateProductItem,
  changeImageForProductItem,
  deleteProduct,
  deleteProductItem,
};

export default productForSellerApi;
