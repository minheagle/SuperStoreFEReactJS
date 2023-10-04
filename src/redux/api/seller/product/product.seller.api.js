import axios from "../../axiosInstance.js";

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
        const options = optionTypeRequestList.map((item) => {
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
        item.imgProductFile.forEach((file, index) => {
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
        await createProductItemOptions(result.results.data.pitemId, options);
        return result;
      })
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const productForSellerApi = { createProduct, createProductItem };

export default productForSellerApi;
