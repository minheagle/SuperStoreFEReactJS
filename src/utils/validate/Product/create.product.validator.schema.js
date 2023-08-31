import * as Yup from "yup";

import imageValidator from "../Product/image.validator.schema.js";
import optionProductValidator from "./option.product.validator.schema.js";

const createProductValidatorSchema = Yup.object().shape({
  productName: Yup.string()
    .min(2, "Min 2 character")
    .max(255, "Max 255 character")
    .required("Required"),
  category: Yup.string().required("Required"),
  basePrice: Yup.number().required("Required").typeError("Must be a number"),
  isNew: Yup.boolean().default(false).required("Required"),
  options: Yup.array()
    .required("Required")
    .min(1, "At least one option is required"),
  images: Yup.array()
    .of(imageValidator)
    .required("Required")
    .min(1, "At least one image is required"),
  descriptions: Yup.string().required("Required").min(10, "Min 10 character"),
});

export default createProductValidatorSchema;
