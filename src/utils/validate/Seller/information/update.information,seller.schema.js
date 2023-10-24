import * as Yup from "yup";

const updateInformationSellerValidatorSchema = Yup.object().shape({
  storeName: Yup.string().required("Required").min(2).max(50),
  storeAddress: Yup.string().required("Required").min(10).max(255),
  storePhoneNumber: Yup.string()
    .required("Required")
    .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Phone is invalid"),
  storeBankName: Yup.string().required("Required"),
  storeBankAccountNumber: Yup.string().required("Required"),
});

export default updateInformationSellerValidatorSchema;
