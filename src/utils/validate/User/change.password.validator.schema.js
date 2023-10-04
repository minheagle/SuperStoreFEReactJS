import * as yup from "yup";

const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required("Required")
    .min(8, "Min 8 character")
    .max(32, "Max 32  character"),
  newPassword: yup
    .string()
    .required("Required")
    .min(8, "Min 8 character")
    .max(32, "Max 32  character"),
  confirmPassword: yup
    .string()
    .required("Required")
    .oneOf([yup.ref("newPassword"), null], "Not match"),
});

export default changePasswordSchema;
