const registerFormError = {
  fullName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  re_password: "",
};

const validateFullName = (formRegister) => {
  const fullName = formRegister.fullName.trim();
  if (fullName.length === 0) {
    return (registerFormError.fullName = "Full Name is required !");
  }
  if (fullName.length > 255) {
    return (registerFormError.fullName = "Full Name length is less 255 char !");
  }
  return (registerFormError.fullName = "");
};

const validatePhoneNumber = (formRegister) => {
  const phone = formRegister.phone.trim();
  const regex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
  if (!regex.test(phone)) {
    return (registerFormError.phone = "Phone Number isn't valid !");
  }
  return (registerFormError.phone = "");
};

const validateAddress = (formRegister) => {
  const address = formRegister.address.trim();
  if (address.length === 0) {
    return (registerFormError.address = "Address is required !");
  }
  return (registerFormError.address = "");
};

const validateEmail = (formRegister) => {
  const email = formRegister.email.trim();
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (email.length === 0) {
    return (registerFormError.email = "Email is required !");
  }
  if (!regex.test(email)) {
    return (registerFormError.email = "Email isn't valid !");
  }
  return (registerFormError.email = "");
};

const validatePassword = (formRegister) => {
  const password = formRegister.password.trim();
  if (password.length === 0) {
    return (registerFormError.password = "Password is required !");
  }
  if (password.length < 8 || password.length > 32) {
    return (registerFormError.password = "Password length is 8 -> 32 char !");
  }
  return (registerFormError.password = "");
};

const validateRePassword = (formRegister) => {
  const password = formRegister.password.trim();
  const re_password = formRegister.re_password.trim();
  if (re_password !== password) {
    return (registerFormError.re_password = "Not matching !");
  }
  return (registerFormError.re_password = "");
};

const validate = [
  validateFullName,
  validateAddress,
  validatePhoneNumber,
  validateAddress,
  validateEmail,
  validatePassword,
  validateRePassword,
];

export const checkError = (formRegisterError) => {
  if (formRegisterError.fullName) {
    return false;
  }
  if (formRegisterError.phone) {
    return false;
  }
  if (formRegisterError.address) {
    return false;
  }
  if (formRegisterError.email) {
    return false;
  }
  if (formRegisterError.password) {
    return false;
  }
  if (formRegisterError.re_password) {
    return false;
  }
  return true;
};

export const checkValueFormRegister = (formRegister) => {
  if (!formRegister.fullName) {
    return false;
  }
  if (!formRegister.phone) {
    return false;
  }
  if (!formRegister.address) {
    return false;
  }
  if (!formRegister.email) {
    return false;
  }
  if (!formRegister.password) {
    return false;
  }
  if (!formRegister.re_password) {
    return false;
  }
  return true;
};

const validator = (formRegister) => {
  validate.forEach((element) => {
    element(formRegister);
  });
  return registerFormError;
};

export default validator;
