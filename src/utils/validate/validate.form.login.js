const loginFormError = {
  email: "",
  password: "",
};

const validateEmail = (loginForm) => {
  const email = loginForm.email.trim();
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (email.length === 0) {
    return (loginFormError.email = "Email is required !");
  }
  if (!regex.test(email)) {
    return (loginFormError.email = "Email is valid !");
  }
  return (loginFormError.email = "");
};

const validatePassword = (loginForm) => {
  const password = loginForm.password.trim();
  if (password.length === 0) {
    return (loginFormError.password = "Password is required !");
  }
  return (loginFormError.password = "");
};

export const checkError = (formLoginError) => {
  if (formLoginError.email) {
    return false;
  }
  if (formLoginError.password) {
    return false;
  }
  return true;
};

export const checkValueFormLogin = (formLogin) => {
  if (!formLogin.email) {
    return false;
  }
  if (!formLogin.password) {
    return false;
  }
  return true;
};

const validate = [validateEmail, validatePassword];

const validator = (loginForm) => {
  validate.forEach((item) => {
    item(loginForm);
  });
  return loginFormError;
};

export default validator;
