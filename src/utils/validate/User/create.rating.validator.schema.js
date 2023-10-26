import * as yup from "yup";
import imageValidator from "../Product/image.validator.schema";

const createRatingValidator = yup.object().shape({
  voteStar: yup
    .number()
    .required("Required")
    .typeError("Must be a number")
    .min(1, "Min is 1")
    .max(5, "Max is 5"),
  comment: yup.string().required("Required"),
  imageProductReviewFile: yup
    .array()
    .of(imageValidator)
    .required("Required")
    .min(1, "At least one image is required"),
});

export default createRatingValidator;
