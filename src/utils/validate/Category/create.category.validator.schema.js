import * as Yup from "yup";

const createCategoryValidatorSchema = Yup.object().shape({
  content: Yup.string().min(1, "Min 1 character").required("Required"),
  parentId: Yup.string().required("Required"),
  file: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Invalid file type", (value) => {
      if (!value) return true; // Allow empty value (no image)
      return (
        value &&
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
          value.type
        )
      );
    })
    .test("fileSize", "File size too large", (value) => {
      if (!value) return true;
      return value && value.size <= 5 * 1024 * 1024;
    }),
});

export default createCategoryValidatorSchema;
