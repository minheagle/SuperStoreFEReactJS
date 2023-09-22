import * as Yup from "yup";

const editProfileValidator = Yup.object().shape({
  fullName: Yup.string().required("Required").min(2, "Min 2 character"),
  gender: Yup.string(),
  dateOfBirth: Yup.date().required("Required"),
  avatar: Yup.mixed()
    .test("fileType", "Invalid file type", (value) => {
      if (!value) return true;
      return (
        value &&
        ["image/jpeg", "image/png", "image/jpg", "image/gif"].includes(
          value.type
        )
      );
    })
    .test("fileSize", "File size too large", (value) => {
      if (!value) return true;
      return value && value.size <= 2 * 1024 * 1024;
    }),
});

export default editProfileValidator;
