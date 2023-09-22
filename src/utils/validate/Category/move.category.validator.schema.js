import * as Yup from "yup";

const moveCategoryValidatorSchema = Yup.object().shape({
  newParentCategoryId: Yup.string().required("Required"),
});

export default moveCategoryValidatorSchema;
