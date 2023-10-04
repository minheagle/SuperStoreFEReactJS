import * as Yup from "yup";

const optionProductValidator = Yup.object().shape({
  optionName: Yup.string().required("Required").min(2, "Min 2 character"),
  optionValueRequest: Yup.string().required("Required"),
});

export default optionProductValidator;
