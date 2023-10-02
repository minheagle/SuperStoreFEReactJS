import * as Yup from "yup";

const editProfileValidator = Yup.object().shape({
  userName: Yup.string().required("Required"),
  fullName: Yup.string().required("Required").min(2, "Min 2 character"),
  phone: Yup.string()
    .required("Required")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone is invalid"),
  email: Yup.string()
    .email("Email is invalid")
    .required("Required")
    .matches(
      /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/,
      "Email is invalid"
    ),
  dateOfBirth: Yup.date().required("Required"),
});

export default editProfileValidator;
