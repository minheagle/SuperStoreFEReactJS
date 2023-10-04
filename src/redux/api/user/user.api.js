import axios from "../axiosInstance.js";

const updateUser = async (updateForm, userId) => {
  try {
    const response = await axios.put(`/users/update/${userId}`, updateForm);
    return response.results;
  } catch (error) {
    throw error;
  }
};

const changeAvatar = async (changeAvatar, userId) => {
  try {
    const response = await axios.post(
      `/users/upload-avatar/${userId}`,
      changeAvatar,
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
    throw new Error(error.message);
  }
};

const addAddress = async (address, userId) => {
  try {
    const response = await axios.post(`/users/add-address/${userId}`, {
      address: address,
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

const updateAddress = async (updateAddress, id) => {
  try {
    const response = await axios.put(
      `/users/update-address/${Number.parseInt(id)}`,
      { address: updateAddress }
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const changePassword = async (changePasswordForm, userId) => {
  try {
    const response = await axios.put(
      `/users/change-password/${userId}`,
      changePasswordForm
    );
    return response;
  } catch (error) {
    throw new Error(error.message);
  }
};

const registerSeller = async (registerSellerForm, userId) => {
  try {
    const response = await axios.post(
      `/users/${userId}/become-seller`,
      registerSellerForm
    );
    return response.results;
  } catch (error) {
    const { data } = error.response;
    const errors = data?.map((item) => {
      return {
        field: item.field,
        message: item.defaultMessage,
      };
    });
    throw errors;
  }
};

const userApi = {
  updateUser,
  changeAvatar,
  addAddress,
  updateAddress,
  changePassword,
  registerSeller,
};

export default userApi;
