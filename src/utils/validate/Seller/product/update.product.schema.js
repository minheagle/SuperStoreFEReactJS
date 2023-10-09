import * as yup from "yup";

const updateProductSchema = () =>
  yup.object().shape({
    productName: yup
      .string()
      .required("Required")
      .min(3, "Min 3 character")
      .max(150, "Max 150 character"),
    description: yup
      .string()
      .required("Required")
      .min(10, "Min 10 character")
      .max(255, "Max 255 character"),
  });

export default updateProductSchema;
