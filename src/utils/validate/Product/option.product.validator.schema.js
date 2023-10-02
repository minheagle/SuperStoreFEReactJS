import * as Yup from "yup";

const optionProductValidator = Yup.object().shape({
  type: Yup.string().required("Required").min(2, "Min 2 character"),
  name: Yup.string().required("Required"),
});

export default optionProductValidator;
