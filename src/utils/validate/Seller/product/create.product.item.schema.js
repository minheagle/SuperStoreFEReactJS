import * as yup from "yup";
import imageValidator from "../../Product/image.validator.schema";
import optionValidator from "../../Product/option.product.validator.schema";

const createProductItemValidatorSchema = (hasOption) => {
  if (hasOption) {
    return yup.object().shape({
      price: yup
        .number()
        .required("Required")
        .typeError("Must be a number")
        .min(1, "Min 1"),
      qtyInStock: yup
        .number()
        .required("Required")
        .typeError("Must be a number")
        .min(1, "Min 1"),
      imgProductFile: yup
        .array()
        .of(imageValidator)
        .required("Required")
        .min(1, "At least one image is required"),
      optionTypeRequestList: yup
        .array()
        .required("Required")
        .min(1, "At least one option is required"),
    });
  } else {
    return yup.object().shape({
      price: yup.number().required("Required").typeError("Must be a number"),
      qtyInStock: yup
        .number()
        .required("Required")
        .typeError("Must be a number"),
      imgProductFile: yup
        .array()
        .of(imageValidator)
        .required("Required")
        .min(1, "At least one image is required"),
    });
  }
};

export default createProductItemValidatorSchema;
