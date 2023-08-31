import * as Yup from "yup";

const imageValidator = Yup.mixed()
  .required("Image is required")
  .test("fileType", "Invalid file type", (value) => {
    if (!value) return true; // Allow empty value (no image)
    return (
      value &&
      ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(value.type)
    );
  })
  .test("fileSize", "File size too large", (value) => {
    if (!value) return true;
    return value && value.size <= 2 * 1024 * 1024;
  });

export default imageValidator;
