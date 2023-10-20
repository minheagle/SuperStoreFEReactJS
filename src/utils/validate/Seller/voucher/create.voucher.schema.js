import * as yup from "yup";

const promotionSchema = yup.object().shape({
  name: yup.string().required("Required"),
  description: yup.string().required("Required"),
  startDate: yup.date().required("Required"),
  endDate: yup
    .date()
    .required("Required")
    .when("startDate", (startDate, schema) => {
      return schema.min(startDate, "End date must be greater than start date");
    }),
  discountType: yup.string().required("Required"),
  discountValue: yup.number("Number").min(0, "Min is 0").required("Required"),
  minPurchaseAmount: yup
    .number("Number")
    .min(0, "Min is 0")
    .required("Required"),
  isActive: yup.boolean(),
  usageLimitPerUser: yup
    .number("Number")
    .min(1, "Min is 1")
    .required("Required"),
});

export default promotionSchema;
