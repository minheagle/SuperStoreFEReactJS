import * as Yup from "yup";

const loginValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Email is invalid"
    ),
  password: Yup.string()
    .required("Required")
    .min(8, "Min 8 character")
    .max(32, "Max 32  character"),
});

export default loginValidatorSchema;
