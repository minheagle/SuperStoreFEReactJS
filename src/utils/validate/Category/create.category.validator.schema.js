import * as Yup from "yup";

const createCategoryValidatorSchema = Yup.object().shape({
  value: Yup.string().min(1, "Min 1 character").required("Required"),
  parent: Yup.string().required("Required"),
});

export default createCategoryValidatorSchema;
