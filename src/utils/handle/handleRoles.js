const checkRole = (role, roles) => {
  let isCheck = false;
  Array.from(roles).forEach((element) => {
    if (element?.name === role) {
      isCheck = true;
    }
  });
  return isCheck;
};

const roleHelper = { checkRole };

export default roleHelper;
