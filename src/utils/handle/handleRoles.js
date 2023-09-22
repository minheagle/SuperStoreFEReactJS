const checkRole = (role, roles) => {
  let isCheck = false;
  roles.forEach((element) => {
    if (element?.authority === role || element?.name === role) {
      isCheck = true;
    }
  });
  return isCheck;
};

const roleHelper = { checkRole };

export default roleHelper;
