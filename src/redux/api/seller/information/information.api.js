import axios from "../../axiosInstance";

const getDetail = async (sellerId) => {
  try {
    const response = await axios.get(`/sellers/${sellerId}`);
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const updateInformation = async (sellerRequestUpdate) => {
  try {
    const response = await axios.put(
      "/sellers/private-information",
      sellerRequestUpdate
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const changeAvatar = async (sellerId, storeAvatar) => {
  try {
    const response = await axios.patch(
      `sellers/${sellerId}/avatar`,
      storeAvatar,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 30 * 1000,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const changeBackground = async (sellerId, storeBackground) => {
  try {
    const response = await axios.patch(
      `sellers/${sellerId}/background`,
      storeBackground,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        method: "post",
        timeout: 30 * 1000,
      }
    );
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const informationSellerApi = {
  getDetail,
  updateInformation,
  changeAvatar,
  changeBackground,
};

export default informationSellerApi;
